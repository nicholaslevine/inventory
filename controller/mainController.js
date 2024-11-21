const { query } = require('../db/pool');
const queries = require('../db/queries');

const mainController = {
    getItems: async (req, res) => {
        const rackets = await queries.getRackets();
        res.render("index", {
            rackets: rackets
        })
    },
    getCategories: async (req, res) => {
        const categories = await queries.getCategories();
        res.render("categories", {
            categories: categories
        })
    },
    createItemPost: async (req, res) => {
        try{
            await queries.createRacket(req.body);
            res.redirect('/');
        }
        catch(err){
            console.error(err);
        }
    },
    createCategoryPost: async (req, res) => {
        try{
            await queries.createCategory(req.body);
            res.redirect('/');
        }
        catch(err){
            console.err(err)
        }
    },
    createItemGet: (req, res) => {
        res.render("create-item");
    },
    createCategoryGet: (req, res) => {
        res.render("create-category");
    },
    updateCategoryGet: (req, res) => {
        const {category} = req.query;
        res.render("update-category", {
            category: category
        })
    },
    updateItemGet: async (req, res) => {
        const {id} = req.query;
        const racket = await query.getRacket(id)
        res.render("update-item", {
            racket: racket,
        });
    },
    updateCategoryPost: async (req, res) => {
        const {oldCategory} = req.query;
        const {newCategory} = req.body;
        await queries.updateCategory(oldCategory, newCategory);
        res.redirect('/');
    },
    updateItemPost: async (req, res) => {
        const {id} = req.query;
        const {newRacket} = req.body
        await queries.updateRacket(id, newRacket);
        res.redirect('/');
    },
    deleteItem: async (req, res) => {
        const {id} = req.query;
        await queries.deleteRacket(id);    
    },
    deleteCategory: async(req, res) => {
        const {category} = req.query;
        await queries.deleteCategory(category);
    }
};


module.exports = mainController;