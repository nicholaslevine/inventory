const db = require('./pool');

async function getAll(){
    const {rows} = await db.query('SELECT * FROM rackets');
    return rows;
}
async function createRacket(racket){
    const racket = await db.query(`INSERT INTO rackets (name, weight, picture, rating) VALUES ($1, $2, $3, $4)`, [racket.name, racket.weight, racket.picture, racket.rating]);
    return racket.rows[0].id;
}
async function getRacket(id){
    const {rows} = (`SELECT * FROM rackets WHERE id == $1`, [id]);
    return rows;
}