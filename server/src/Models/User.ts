// import mongoose, { Document, Schema } from "mongoose";
import mongoose from "../engine/db";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;