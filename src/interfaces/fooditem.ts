import { Document, ObjectId } from 'mongoose';
export interface IFoodItem extends Document {
    name: string;
    images: string[];
    description: string;
    menuHeader: ObjectId;
    type: FoodType;
    attribute: FoodAttributes;
    attributePet: PetFoodAttributes[];
    weightAttribute: WeightAttributes[];
    sellWithin: string;
    searchKeywords: string[];
    isDeleted: boolean;
}

export enum FoodType {
    'Veg',
    'Non Veg',
    'Pet'
}

export enum PetFoodAttributes {
    Dog,
    Cat,
    Bird
}

export enum VegSpecific {
    'Jain Food',
    'Vegan',
    'N/A'
}

export enum SugarLevel {
    'Contains Sugar',
    'No Added Sugar',
    'N/A'
}

export enum SpiceLevel {
    'Spicy',
    'Medium Spicy',
    'Extra Spicy',
    'N/A'
}
export enum Area {
    Five = '5',
    Ten = '10',
    Fifteen = '15',
    Twenty = '20',
    'Twenty Five' = '25',
    City = 'city',
    State = 'state',
    Country = 'country'
}

export enum Other {
    'Egg-Less',
    'Contains Egg',
    'Gluten Free',
    'Lactose Free',
    'N/A'
}

export interface FoodAttributes {
    vegSpecific: VegSpecific;
    sugarLevel: SugarLevel;
    spiceLevel: SpiceLevel;
    other: Other[];
}

export interface WeightAttributes {
    packageWeight: PackageWeight;
    itemWeight: ItemWeight;
}

export interface ItemWeight {
    unit: string;
    value: string;
    price: string;
}
export interface PackageWeight {
    unit: string;
    value: string;
}
