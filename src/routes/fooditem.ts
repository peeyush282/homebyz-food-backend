import { createFoodItem, deleteFoodItem, getAllItemOfStore, updateFoodItem, getFoodItem } from './../controllers/fooditem/fooditem';

import { Router } from 'express';
import { fileUpload } from '../utils/fileupload';

const foodItemRouter = Router();
const upload = fileUpload('foodItem');

foodItemRouter.get('/:itemId', getFoodItem);
foodItemRouter.post('/create', upload.array('images'), createFoodItem);
foodItemRouter.get('/all/:storeId', getAllItemOfStore);
foodItemRouter.put('/update/:itemId', upload.array('images'), updateFoodItem);
foodItemRouter.delete('/delete/:itemId', deleteFoodItem);
// foodItemRouter.delete('/delete/:id', deleteMenuHeader);

export default foodItemRouter;
