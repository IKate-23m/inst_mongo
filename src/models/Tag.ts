import mongoose, { Document, Schema } from 'mongoose';

export interface ITag extends Document {
  name: string;
  postCount: number;
  posts: mongoose.Types.ObjectId[];
}

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  postCount: { type: Number, default: 0 },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

export const Tag = mongoose.model<ITag>('Tag', tagSchema);
