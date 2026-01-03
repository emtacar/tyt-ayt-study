import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  checkedItems: Record<string, boolean>;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  checkedItems: { type: Map, of: Boolean, default: {} },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
