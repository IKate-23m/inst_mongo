import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  role?: string;
  posts: mongoose.Types.ObjectId[];
  collections: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, default: null },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
