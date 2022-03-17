import { s3Upload } from './../../utils/s3Upload';
import logging from '../../config/logging';
import { requiredParam } from './validation';
import { Api, Message } from '../../utils/constants';
import { create, get, getItems, remove, update } from './use_cases';
import MenuHeader from '../../models/MenuHeader';

export const createFoodItem = async (req, res) => {
    try {
        let foodItemDetails = req.body;
        let attribute;
        let attributePet;
        const images = [];

        const weightAttribute = JSON.parse(foodItemDetails.weightAttribute);
        foodItemDetails = { ...foodItemDetails, weightAttribute };

        if (foodItemDetails?.attribute) {
            attribute = JSON.parse(foodItemDetails.attribute);
            foodItemDetails = { ...foodItemDetails, attribute, weightAttribute };
        }

        if (foodItemDetails?.attributePet) {
            attributePet = JSON.parse(foodItemDetails.attributePet);
            foodItemDetails = { ...foodItemDetails, attributePet, weightAttribute };
        }

        // TODO

        // const { success, message } = requiredParam(req);

        // if (!success) {
        //     logging.error(message, req.originalUrl, req.headers.id, 'createFoodItem');
        //     return Api.badRequest(res, '', message);
        // }

        if (req.files) {
            for await (const image of req.files) {
                await s3Upload(image, 'foodItem');

                images.push(image.filename);
            }
        }
        foodItemDetails = { ...foodItemDetails, attribute, weightAttribute, images };
        const result = await create(foodItemDetails);

        if (!result.success) {
            logging.error(result.message, req.originalUrl, req.headers.userId, 'createFoodItem');

            return Api.badRequest(res, '', result.message);
        }

        const foodItems = [result.data._id.valueOf()];
        await MenuHeader.findOneAndUpdate({ _id: req.body.menuHeader }, { $push: { foodItems } });
        Api.ok(res, null, result.message);

        logging.info(result.message, req.originalUrl, req.headers.userId, 'createFoodItem');
    } catch (error) {
        logging.error(error.message, req.originalUrl, req.headers.id, 'createFoodItem');

        Api.serverError(req, res, error, error.message);
    }
};
export const updateFoodItem = async (req, res) => {
    try {
        let foodItemDetails = req.body;
        let attribute;
        let attributePet;
        let weightAttribute;

        let images = [];

        if (foodItemDetails?.attribute) {
            const attribute = JSON.parse(foodItemDetails.attribute);
            foodItemDetails = { ...foodItemDetails, attribute };
        }
        if (foodItemDetails?.attributePet) {
            attributePet = JSON.parse(foodItemDetails.attributePet);
            foodItemDetails = { ...foodItemDetails, attributePet, weightAttribute };
        }
        if (foodItemDetails?.weightAttribute) {
            const weightAttribute = JSON.parse(foodItemDetails.weightAttribute);
            foodItemDetails = { ...foodItemDetails, attribute, weightAttribute };
        }
        console.log(foodItemDetails.weightAttribute);
        console.log(foodItemDetails);

        const { itemId } = req.params;

        const itemDetails = await get(itemId);
        images = itemDetails.fooditem.images;
        if (foodItemDetails?.oldImage) {
            const oldImage = JSON.parse(foodItemDetails?.oldImage);

            oldImage.forEach((image, index) => {
                images.forEach((img) => {
                    if (img === image) {
                        images.splice(index, 1);
                    }
                });
            });
        }

        if (req.files) {
            for await (const image of req.files) {
                await s3Upload(image, 'foodItem');

                images.push(image.filename);
            }
            foodItemDetails = { ...foodItemDetails, images };
        }

        if (req.files.length === 0 && !req.body.oldImage) {
            const images = itemDetails.fooditem.images;
            foodItemDetails = { ...foodItemDetails, images };
        }
        console.log(foodItemDetails);

        const result = await update(itemId, foodItemDetails);

        if (!result.success) {
            logging.error(result.message, req.originalUrl, req.headers.userId, 'updateFoodItem');

            return Api.badRequest(res, '', result.message);
        }

        Api.ok(res, null, result.message);

        logging.info(Message.UpdateSuccessful, req.originalUrl, req.headers.userId, 'updateFoodItem');
    } catch (error) {
        logging.error(error.message, req.originalUrl, req.headers.id, 'updateFoodItem');

        Api.serverError(req, res, error, error.message);
    }
};

export const getAllItemOfStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { items, success, message } = await getItems(storeId);

        if (!success) {
            logging.error(message, req.originalUrl, req.headers.userId, 'getAllItemOfStore');

            return Api.badRequest(res, '', message);
        }

        Api.ok(res, items, Message.Found);
    } catch (error) {
        logging.error(error.message, req.originalUrl, req.headers.id, 'getAllItemOfStore');

        Api.serverError(req, res, error, error.message);
    }
};
export const deleteFoodItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { success, message } = await remove(itemId);

        if (!success) {
            logging.error(message, req.originalUrl, req.headers.userId, 'deleteFoodItem');

            return Api.badRequest(res, '', message);
        }

        Api.ok(res, null, message);
    } catch (error) {
        logging.error(error.message, req.originalUrl, req.headers.id, 'deleteFoodItem');

        Api.serverError(req, res, error, error.message);
    }
};
export const getFoodItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { fooditem, success, message } = await get(itemId);

        if (!success) {
            logging.error(message, req.originalUrl, req.headers.userId, 'getFoodItem');

            return Api.badRequest(res, '', message);
        }

        Api.ok(res, fooditem, message);
    } catch (error) {
        logging.error(error.message, req.originalUrl, req.headers.id, 'getFoodItem');

        Api.serverError(req, res, error, error.message);
    }
};
