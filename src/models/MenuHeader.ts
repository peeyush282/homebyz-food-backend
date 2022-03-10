import { Schema, model } from 'mongoose';
import { IMenuHeader } from '../interfaces/menuheader';

const MenuHeaderSchema = new Schema(
    {
        name: { type: String, required: true },
        storeId: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
        catId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
        foodItems: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }]
    },
    { timestamps: true }
);

export default model<IMenuHeader>('MenuHeader', MenuHeaderSchema);
