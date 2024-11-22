const pool = require('./pool');

async function getRackets(){
    try{
        const {rows} = await pool.query('SELECT * FROM rackets WHERE name IS NOT NULL;');
        return rows;
    }
    catch(e){
        console.error(e);
    }
}
async function createRacket(racket){
    try{
        await pool.query(`INSERT INTO rackets (name, weight, picture, rating, category) VALUES ($1, $2, $3, $4, $5)`, [racket.name, racket.weight, racket.picture, racket.rating, racket.category]);
    }
    catch(e){
        console.error(e);
    }
    
}
async function getRacket(name){
    try{
        const {rows} = await pool.query(`SELECT * FROM rackets WHERE name = $1`, [name]);
        return rows;
    }
    catch(e){
        console.error(e);
    }
    
}
async function getCategories(){
    try{
        const {rows} = await pool.query('SELECT DISTINCT category FROM rackets');
        return rows;
    }
    catch(e){
        console.error(e);
    }  
}
async function createCategory(category){
    try{
        await pool.query('INSERT INTO rackets (category) VALUES ($1)', [
            category
        ]);
    }
    catch(e){
        console.error(e)
    }
    
}
async function updateRacket(id, newRacket){
    try{
        await pool.query('UPDATE rackets SET name = $1, weight = $2, picture = $3, rating = $4, category = $5 WHERE id = $6', [
            newRacket.name, newRacket.weight, newRacket.picture, newRacket.rating, newRacket.category, id
        ])
    }
    catch(e){
        console.error(e);
    }
}
async function updateCategory(oldCategory, newCategory){
    try{
        await pool.query('UPDATE rackets SET category = $1 WHERE category = $2', [newCategory, oldCategory]);
    }
    catch(e){
        console.error(e);
    }
   
}
async function deleteRacket(id){
    try{
        await pool.query('UPDATE rackets SET name = NULL, weight = NULL, picture = NULL, rating = NULL WHERE id = $1', [id])
    }
    catch(e){
        console.error(e);
    }
    
}
async function deleteCategory(category){
    try{
        await pool.query(`DELETE FROM rackets WHERE category = $1`, [category])
    }
    catch(e){
        console.error(e);
    }
    
};



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
