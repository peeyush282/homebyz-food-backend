import { createMenuHeader, deleteMenuHeader, findAllMenuHeader, findMenuHeader, updateMenuHeader } from '../controllers/menuheader/menuheader';

import { Router } from 'express';

const munuHeaderRouter = Router();

munuHeaderRouter.get('/all/:storeId', findAllMenuHeader);
munuHeaderRouter.get('/:id', findMenuHeader);
munuHeaderRouter.post('/create', createMenuHeader);
munuHeaderRouter.put('/update/:id', updateMenuHeader);
munuHeaderRouter.delete('/delete/:id', deleteMenuHeader);

export default munuHeaderRouter;
