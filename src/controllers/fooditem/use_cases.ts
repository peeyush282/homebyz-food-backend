import MenuHeader from '../../models/MenuHeader';
import FoodItem from '../../models/FoodItem';
import { Message } from '../../utils/constants';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export async function create(foodItem) {
    try {
        const newFoodItem = await FoodItem.create(foodItem);

        return { success: true, message: Message.FoodItemCreated, data: newFoodItem };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function get(val) {
    const fooditem = await FoodItem.findOne({ _id: val });

    if (!fooditem) {
        return { success: false, message: Message.NotFound };
    }

    return { success: true, fooditem };
}

export async function getItems(val) {
    const fooditem = await FoodItem.aggregate([
        { $match: { storeId: new mongoose.Types.ObjectId(val) } },
        { $group: { _id: '$menuHeader', info: { $first: '$$ROOT' } } }
    ]);
    const fitems = await FoodItem.populate(fooditem, { path: '_id', model: 'MenuHeader' });

    if (!fooditem) {
        return { success: false, message: Message.NotFound };
    }

    return { success: true, items: fitems };
}

export async function update(id, foodItem) {
    const fooditem = await FoodItem.findOneAndUpdate({ _id: id }, { $set: foodItem });

    if (!fooditem) {
        return { success: false, message: Message.NotFound };
    }

    return { success: true, message: Message.UpdateSuccessful };
}
export async function remove(val) {
    // const foodItems = new ObjectId(val);
    const f = await MenuHeader.updateOne({ foodItems: { $all: [val] } }, { $pull: { foodItems: val } });

    const fooditem = await FoodItem.findOneAndUpdate({ _id: val }, { $set: { isDeleted: true } });

    if (!fooditem) {
        return { success: false, message: Message.NotFound };
    }

    return { success: true, message: Message.DeletedSuccessfully };
}
