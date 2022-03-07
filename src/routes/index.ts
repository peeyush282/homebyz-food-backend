import express from 'express';
import foodItemRouter from './fooditem';
import menuHeaderRouter from './menuHeader';

const routes = express.Router();
routes.use('/menu-header', menuHeaderRouter);
routes.use('/item', foodItemRouter);

export default routes;
