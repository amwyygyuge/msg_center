// app.ts
import { Application, IBoot } from 'egg'
import * as mongoose from 'mongoose'
const awaitFirst = require('await-first')
let count = 0
interface mongoOnApp extends Application {
	mongooseDB: any
	mongoose: any
	__mongoose: any
}

export default class FooBoot implements IBoot {
	private readonly app: mongoOnApp

	constructor(app: mongoOnApp) {
		this.app = app
	}
	initMongo() {
		const { client, clients, url, options, customPromise, defaultDB } = this.app.config.mongoose
		// compatibility
		if (!client && !clients && url) {
			this.app.config.mongoose.client = {
				url,
				options
			}
		}

		Object.assign(mongoose, { Promise: customPromise ? customPromise : Promise })

		// TODO addSingleton support config[this.configName]?
		this.app.addSingleton('mongoose', createOneClient)

		this.app.mongooseDB = this.app.mongoose

		// set default connection(ref models has fixed in mongoose 4.13.7)
		if (this.app.mongooseDB instanceof mongoose.Connection) {
			Object.assign(mongoose, { connection: this.app.mongooseDB })
		} else if (defaultDB && this.app.mongooseDB.get(defaultDB) instanceof mongoose.Connection) {
			Object.assign(mongoose, { connection: this.app.mongooseDB.get(defaultDB) })
		}

		this.app.mongoose = mongoose
		/* deprecated, next primary version remove */
		this.app.__mongoose = mongoose
	}

	configWillLoad() {
		// Ready to call configDidLoad,
		// Config, plugin files are referred,
		// this is the last chance to modify the config.
	}

	configDidLoad() {
		// Config, plugin files have loaded.
		this.initMongo()
	}

	async didLoad() {
		// All files have loaded, start plugin here.
	}

	async willReady() {
		// All plugins have started, can do some thing before app ready.
	}

	async didReady() {
		// Worker is ready, can do some things
		// don't need to block the app boot.
	}

	async serverDidReady() {
		// Server is listening.
	}

	async beforeClose() {
		// Do some thing before app close.
	}
}

function createOneClient(config, app) {
	const { url, options } = config
	const filteredURL = filterURLPassword(url)

	// assert(url, '[egg-mongoose] url is required on config')

	// Notice we MUST add an option arg called `useNewUrlParser` and set to `true`
	// in default, otherwises there'll be a warning since v4.X of mongodb.
	// Ref: https://github.com/eggjs/egg/issues/3081
	if (!options.hasOwnProperty('useNewUrlParser')) {
		options.useNewUrlParser = true
	}
	app.coreLogger.info('[egg-mongoose] connecting %s', filteredURL)

	const db = mongoose.createConnection(url, options)

	/* istanbul ignore next */
	db.on('error', err => {
		err.message = `[egg-mongoose]${err.message}`
		app.coreLogger.error(err)
	})

	/* istanbul ignore next */
	db.on('disconnected', () => {
		app.coreLogger.error(`[egg-mongoose] ${filteredURL} disconnected`)
	})

	db.on('connected', () => {
		app.coreLogger.info(`[egg-mongoose] ${filteredURL} connected successfully`)
	})

	/* istanbul ignore next */
	db.on('reconnected', () => {
		app.coreLogger.info(`[egg-mongoose] ${filteredURL} reconnected successfully`)
	})

	app.beforeStart(function*() {
		app.coreLogger.info('[egg-mongoose] starting...')
		yield awaitFirst(db, [ 'connected', 'error' ])
		const index = count++
		/*
     *remove heartbeat to avoid no authentication
      const serverStatus = yield db.db.command({
        serverStatus: 1,
      });

      assert(serverStatus.ok === 1, '[egg-mongoose] server status is not ok, please check mongodb service!');
    */
		app.coreLogger.info(`[egg-mongoose] instance[${index}] start successfully`)
	})

	return db
}

function filterURLPassword(input) {
	const index = input.indexOf('@')
	if (index === -1) return input
	const startIndex = input.lastIndexOf(':', index)
	return input.substring(0, startIndex + 1) + '******' + input.substring(index)
}
