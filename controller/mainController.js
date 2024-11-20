const queries = require('../db/queries');

const mainController = {
    getItems: async (req, res) => {
        const rackets = await queries.getRackets();
        res.render("index", )
    },

}