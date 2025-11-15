import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  mediaURL: string;
  caption?: string;
  comments: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
  collections: mongoose.Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mediaURL: { type: String, required: true },
  caption: { type: String, default: null },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }]
}, { timestamps: true });

export const Post = mongoose.model<IPost>('Post', postSchema);

