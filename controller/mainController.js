const { queries } = require('../db/pool');
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
            const {name} = req.body
            await queries.createCategory(name);
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
        const {category} = req.params;
        res.render("update-category", {
            category: category
        })
    },
    updateItemGet: async (req, res) => {
        const {id} = req.params;
        const racket = await queries.getRacket(id)
        res.render("update-item", {
            racket: racket,
        });
    },
    updateCategoryPost: async (req, res) => {
        const {oldCategory} = req.params;
        const {newCategory} = req.body;
        await queries.updateCategory(oldCategory, newCategory);
        res.redirect('/');
    },
    updateItemPost: async (req, res) => {
        const {id} = req.params;
        const {newRacket} = req.body
        await queries.updateRacket(id, newRacket);
        res.redirect('/');
    },
    deleteItem: async (req, res) => {
        const {id} = req.params;
        await queries.deleteRacket(id);    
    },
    deleteCategory: async(req, res) => {
        const {category} = req.params;
        await queries.deleteCategory(category);
    }
};


module.exports = mainController;