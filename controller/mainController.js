const queries = require('../db/queries');
const {body, validationResult} = require('express-validator');

const itemsValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isAlpha()
        .withMessage("Name must only contain alphabet letters"),
    body("weight")
        .isInt({min: 0, max: 1000})
        .withMessage("Must be an integer between 1 and 1000"),
    body("picture")
        .notEmpty()
        .withMessage("Must not be empty"),
    body("rating")
        .isNumeric({min:0, max:5})
        .withMessage("Must be a number between 0 and 5"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty")
        .isAlpha()
        .withMessage("Category must only contain alphabet letters")
];

const categoryValidation = [
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty")
        .isAlpha()
        .withMessage("Category must only contain alphabet letters")
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
    createItemPost: [
        itemsValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.send("Errors");
            }
            try{
                await queries.createRacket(req.body);
                res.redirect('/');
            }
            catch(err){
                console.error(err);
            }
    }],
    createCategoryPost: [
        categoryValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.send("Errors");
            }
            try{
                const {name} = req.body
                await queries.createCategory(name);
                res.redirect('/');
            }
            catch(err){
                console.err(err)
            }
    }],
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
    updateCategoryPost: [
        categoryValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.send("Errors");
        }
        const {category} = req.params;
        const {name} = req.body;
        await queries.updateCategory(category, name);
        res.redirect('/');
    }],
    updateItemPost: [
        itemsValidation,
        async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.send("Errors");}
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
    }],
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