const {Router} = require('express');
const {getItems, createItemGet, createItemPost, updateItemGet, updateItemPost, deleteItem} = require('../controller/mainController');
const racketRouter = Router();

racketRouter.get('/', getItems);

racketRouter.get('/create', createItemGet);
racketRouter.post('/create', createItemPost);

racketRouter.get('/update/:id', updateItemGet);
racketRouter.post('/update/:id', updateItemPost);

racketRouter.get('/delete/:id', deleteItem);

module.exports = racketRouter;