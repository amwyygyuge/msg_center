import { Document, Schema, Model, model } from 'mongoose'
import { IApp } from './../interfaces/app'
export interface AppModel extends IApp, Document {}

export const AppSchema: Schema = new Schema({
	name: String,
	app_id: Number
})

export const App: Model<AppModel> = model<AppModel>('App', AppSchema)
