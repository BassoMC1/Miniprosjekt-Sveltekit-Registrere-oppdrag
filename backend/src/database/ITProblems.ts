import mongoose, { Document } from 'mongoose';


interface ITProblems extends Document {
    ID: string,
    Dato: Date,
    Name: string,
    Produkt: string,
    Skildring: string,
}

const ITProblemsSchema = new mongoose.Schema({
    ID: { type: String, required: true},
    Dato: { type: Date, required: true },
    Name: { type: String, required: true },
    Produkt: { type: String, require: true },
    Skildring: { type: String, require: true}
});

export default mongoose.models.ITProblemsSchema || mongoose.model<ITProblems>('ITProblems', ITProblemsSchema);