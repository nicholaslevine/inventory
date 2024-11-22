const { captureRejectionSymbol } = require('events');
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
        try{
            const rackets = await queries.getRackets();
            return res.render("index", {
            rackets: rackets
        })
        }
        catch(e){
            console.log(e);
            throw e
        }
    },
    getCategories: async (req, res) => {
        try{
            const categories = await queries.getCategories();
            return res.render("categories", {
                categories: categories
            })
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },
    createItemPost: [
        itemsValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.render("create-item", {
                    errors: errors.array()
                });
            }
            try{
                await queries.createRacket(req.body);
                res.redirect('/');
            }
            catch(err){
                console.error(err);
                throw err;
            }
    }],
    createCategoryPost: [
        categoryValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.render("create-category", {
                    errors: errors.array()
                });
            }
            try{
                const {name} = req.body
                await queries.createCategory(name);
                res.redirect('/');
            }
            catch(err){
                console.err(err);
                throw err;
            }
    }],
    createItemGet: (req, res) => {
        try{
            res.render("create-item");
        }
        catch(e){
            console.error(e);
        }
    },
    createCategoryGet: (req, res) => {
        try{
            res.render("create-category");
        }
        catch(e){
            console.error(e);
        }
    },
    updateCategoryGet: (req, res) => {
        try{
            const {category} = req.params;
            return res.render("update-category", {
                category: category
            })
        }
        catch(e){
            console.error(e);
        } 
    },
    updateItemGet: async (req, res) => {
        try{
            const {id} = req.params;
            const racket = await queries.getRacket(id)
            return res.render("update-item", {
                racket: racket,
                id: id,
            });
        }
        catch(e){
            console.error(e);
        }
    },
    updateCategoryPost: [
        categoryValidation,
    async (req, res) => {
        const errors = validationResult(req);
        const {category} = req.params;
        if(!errors.isEmpty()){
            res.render("update-category", {
                category: category,
                errors: errors.array()
            });
        }
        try{
            const {name} = req.body;
            await queries.updateCategory(category, name);
            res.redirect('/');
        }
        catch(e){
            console.error(e);
        }
    }],
    updateItemPost: [
        itemsValidation,
        async (req, res) => {
        const errors = validationResult(req);
        const {id} = req.params;
        const racket = query.getRacket(id);
        if(!errors.isEmpty()){
            res.render("update-item", {
                racket: racket,
                errors: errors.array()
            });;}

        try{
            const {name, weight, picture, rating, category} = req.body;
            await queries.updateRacket(id, {
                name, 
                weight,
                picture,
                rating,
                category 
            });
            res.redirect('/');
        }
        catch(e){
            console.error(e);
        }
    }],
    deleteItem: async (req, res) => {
        try{
            const {id} = req.params;
            await queries.deleteRacket(id);    
            res.redirect('/');
        }
        catch(e){
            console.error(e);
        }
    },
    deleteCategory: async(req, res) => {
        try{
            const {category} = req.params;
            await queries.deleteCategory(category);
            res.redirect('/');
        }
        catch(e){
            console.error(e);
        }
    }
};


module.exports = mainController;