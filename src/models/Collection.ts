
import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  description?: string;
  coverImage?: string;
  owner: mongoose.Types.ObjectId;
  posts: mongoose.Types.ObjectId[];
}

const collectionSchema = new Schema<ICollection>({
  name: { type: String, required: true },
  description: { type: String, default: null },
  coverImage: { type: String, default: null },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);
