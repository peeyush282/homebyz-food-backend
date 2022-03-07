import { Document, ObjectId } from 'mongoose';
export interface IMenuHeader extends Document {
    name: string;
    storeId: ObjectId;
    catId: ObjectId;
}
