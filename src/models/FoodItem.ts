import { FoodType, IFoodItem, SpiceLevel, SugarLevel, VegSpecific, Other, PetFoodAttributes, WeightAttributes, Area } from './../interfaces/fooditem';
import { Schema, model } from 'mongoose';

const FoodItemSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
        images: [{ type: String, trim: true }],
        menuHeader: { type: Schema.Types.ObjectId, ref: 'MenuHeader' },
        description: { type: String, trim: true },
        type: { type: String, enum: FoodType },
        attribute: {
            vegSpecific: { type: String, enum: VegSpecific, trim: true },
            sugarLevel: { type: String, enum: SugarLevel, trim: true },
            spiceLevel: { type: String, enum: SpiceLevel, trim: true },
            other: [{ type: String, enum: Other }]
        },
        attributePet: [{ type: String, enum: PetFoodAttributes }],
        weightAttribute: [
            {
                packageWeight: { unit: { type: String, trim: true }, value: { type: String, trim: true } },
                itemWeight: {
                    unit: { type: String, trim: true },
                    value: { type: String, trim: true },
                    price: { type: String, trim: true }
                }
            }
        ],
        sellWithin: { type: String, enum: Area, trim: true },
        searchKeywords: [{ type: String, trim: true }],
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default model<IFoodItem>('FoodItem', FoodItemSchema);
