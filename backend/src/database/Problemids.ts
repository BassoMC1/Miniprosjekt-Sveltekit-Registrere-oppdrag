import mongoose, { Document } from 'mongoose';


interface ITProblemsIDs extends Document {
   id: Number,
}

const ITProblemsIdsSchema = new mongoose.Schema({
    id: { type: Number, require: true, default: 1}
});

export default mongoose.models.ITProblemsIdsSchema || mongoose.model<ITProblemsIDs>('ITProblemsIds', ITProblemsIdsSchema);