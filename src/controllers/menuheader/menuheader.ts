import { makeDb } from '../../utils/dbConnect';
import MenuHeader from '../../models/MenuHeader';
import mongoose from 'mongoose';
export const findAllMenuHeader = async (req, res) => {
    try {
        const { storeId } = req.params;
        const db = await makeDb();
        const id = new mongoose.Types.ObjectId(storeId);
        const menuHeaders = await db.collection('menuheaders').aggregate([
            {
                $match: { storeId: id }
            },
            {
                $lookup: {
                    from: 'fooditems',
                    localField: 'foodItems',
                    foreignField: '_id',
                    as: 'foodItems'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'catId',
                    foreignField: '_id',
                    as: 'catId'
                }
            }
        ]);
        // console.log(await menuHeaders.toArray());

        const menuHeader = await menuHeaders.toArray();
        console.log(menuHeader);

        // const menuHeader = await MenuHeader.find({ storeId }).populate('foodItems').populate('catId');
        if (menuHeader.length === 0) {
            return res.status(400).json({ success: false, message: 'Menu Header not found' });
        }
        res.status(200).json({ success: true, data: menuHeader, message: 'Menu Header found' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const findMenuHeader = async (req, res) => {
    try {
        const { id } = req.params;
        // const categories = await MenuHeader.findOne({ _id: id });
        const db = await makeDb();
        const _id = new mongoose.Types.ObjectId(id);
        const categoryList = await db.collection('menuheaders').aggregate([
            {
                $match: { _id }
            },

            {
                $lookup: {
                    from: 'categories',
                    localField: 'catId',
                    foreignField: '_id',
                    as: 'catId'
                }
            }
        ]);
        const categories = await categoryList.toArray();
        if (!categories) {
            return res.status(400).json({ success: false, message: 'Menu Header not found' });
        }
        res.status(200).json({ success: true, data: categories, message: 'Menu Header found' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createMenuHeader = async (req, res) => {
    try {
        const { name, storeId, catId } = req.body;

        const categories = await MenuHeader.findOne({ name });

        if (categories) {
            return res.status(400).json({ success: false, message: 'Menu Header with name exist' });
        }

        const menuHeader = await MenuHeader.create({ name, storeId, catId });

        if (!menuHeader) {
            return res.status(400).json({ success: false, message: 'Menu Header not found' });
        }
        res.status(201).json({ success: true, message: 'Menu Header created' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateMenuHeader = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const menuHeader = await MenuHeader.findOneAndUpdate({ _id: id }, { $set: data });

        if (!menuHeader) {
            return res.status(400).json({ success: false, message: 'Menu Header not found' });
        }

        res.status(200).json({ success: true, message: 'Menu Header updated' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteMenuHeader = async (req, res) => {
    try {
        const { id } = req.params;
        const menuHeader = await MenuHeader.findById(id);

        if (!menuHeader) {
            return res.status(400).json({ success: false, message: 'Menu Header not found' });
        }

        await menuHeader.deleteOne();

        res.status(200).json({ success: true, message: 'Menu Header deleted' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
