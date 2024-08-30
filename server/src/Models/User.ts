import mongoose from "../engine/db";

export interface IUser extends Document {
  username: string;
  password: string;
  wins: number;
  losses: number;
  draws: number;
  score: number;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  score: { type: Number, default: 0 }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
