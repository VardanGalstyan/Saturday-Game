import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const HistorySchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: 'Session' },
}, { timestamps: true });

export default model('History', HistorySchema);