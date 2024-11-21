const {Router} = require('express');
const {getCategories, createCategoryGet, createCategoryPost, updateCategoryGet, updateCategoryPost, deleteCategory} = require('../controller/mainController');
const categoryRouter = Router();

categoryRouter.get('/', getCategories);

categoryRouter.get('/create', createCategoryGet);
categoryRouter.post('/create', createCategoryPost);

categoryRouter.get('/update/:id', updateCategoryGet);
categoryRouter.post('/update/:id', updateCategoryPost);

categoryRouter.get('/delete/:id', deleteCategory);

module.exports = categoryRouter;