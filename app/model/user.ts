import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './../interfaces/user'

interface UserModal extends IUser, Document {}

const UserSchema: Schema = new Schema({
	user_id: Number,
	name: String,
	cname: String,
	email: String,
	qq: String,
	dept: String,
})

export const User: Model<UserModal> = model<UserModal>('User', UserSchema)
