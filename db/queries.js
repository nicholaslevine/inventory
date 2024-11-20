const pool = require('./pool');

async function getRackets(){
    const {rows} = await pool.query('SELECT * FROM rackets WHERE name IS NOT NULL;');
    return rows;
}
async function createRacket(racket){
    await pool.query(`INSERT INTO rackets (name, weight, picture, rating, category) VALUES ($1, $2, $3, $4, $5)`, [racket.name, racket.weight, racket.picture, racket.rating, racket.category]);
}
async function getRacket(name){
    const {rows} = await pool.query(`SELECT * FROM rackets WHERE name = $1`, [name]);
    return rows;
}
async function getCategories(){
    const {rows} = await pool.query('SELECT category FROM rackets');
    return rows;
}
async function createCategory(category){
    await pool.query('INSERT INTO rackets (category) VALUES ($1)', [
        category
    ]);
}
async function updateRacket(id, newRacket){
    await pool.query('UPDATE rackets SET name = $1, weight = $2, picture = $3, rating = $4, category = $5 WHERE id = $6', [
        newRacket.name, newRacket.weight. newRacket.picture, newRacket.rating, newRacket.category, id
    ])
}
async function updateCategory(oldCategory, newCategory){
    await pool.query('UPDATE rackets SET category = $1 WHERE category = $2', [newCategory, oldCategory]);
}
async function deleteRacket(id){
    await pool.query('UPDATE rackets SET name = NULL, weight = NULL, picture = NULL, rating = NULL WHERE id = $1', [id])
}
async function deleteCategory(category){
    await pool.query(`DELETE FROM rackets WHERE category = $1`, [category])
}

const racket = {
    name: "Nicholas",
    weight: 23,
    picture:"picture",
    rating: 4.5,
    category: "ex-fapper",
};
createRacket(racket);
const rackets = getRackets();
console.log(rackets);

module.exports = {
    getRackets,
    createRacket,
    getRacket,
    getCategories,
    createCategory,
    updateRacket,
    updateCategory,
    deleteRacket,
    deleteCategory
}
