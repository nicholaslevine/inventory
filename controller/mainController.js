const queries = require('../db/queries');

const itemValidator = [
    body("name")
]



const mainController = {
    getItems: async (req, res) => {
        const rackets = await queries.getRackets();
        return res.render("index", {
            rackets: rackets
        })
    },
    getCategories: async (req, res) => {
        const categories = await queries.getCategories();
        return res.render("categories", {
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
        return res.render("update-category", {
            category: category
        })
    },
    updateItemGet: async (req, res) => {
        const {id} = req.params;
        const racket = await queries.getRacket(id)
        return res.render("update-item", {
            racket: racket,
            id: id,
        });
    },
    updateCategoryPost: async (req, res) => {
        const {category} = req.params;
        const {name} = req.body;
        await queries.updateCategory(category, name);
        res.redirect('/');
    },
    updateItemPost: async (req, res) => {
        const {name, weight, picture, rating, category} = req.body;
        const {id} = req.params;
        await queries.updateRacket(id, {
            name, 
            weight,
            picture,
            rating,
            category 
        });
        res.redirect('/');
    },
    deleteItem: async (req, res) => {
        const {id} = req.params;
        await queries.deleteRacket(id);    
        res.redirect('/');
    },
    deleteCategory: async(req, res) => {
        const {category} = req.params;
        await queries.deleteCategory(category);
        res.redirect('/');
    }
};


module.exports = mainController;