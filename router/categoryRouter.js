const {Router} = require('express');
const {getCategories, createCategoryGet, createCategoryPost, updateCategoryGet, updateCategoryPost, deleteCategory} = require('../controller/mainController');
const categoryRouter = Router();

categoryRouter.get('/', getCategories);

categoryRouter.get('/create', createCategoryGet);
categoryRouter.post('/create', createCategoryPost);

categoryRouter.get('/update/:category', updateCategoryGet);
categoryRouter.post('/update/:category', updateCategoryPost);

categoryRouter.get('/delete/:category', deleteCategory);

module.exports = categoryRouter;