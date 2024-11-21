const { Client } = require('pg');
require('dotenv').config();

const createTableSQL = `
CREATE TABLE IF NOT EXISTS rackets(
  id SERIAL PRIMARY KEY,
  name TEXT,
  weight INTEGER,
  picture TEXT,
  rating FLOAT, 
  category TEXT
);`;


async function main(){
    const client = new Client({
        host: process.env.HOST,  
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });

    try {
        await client.connect();
        console.log('Connected to the database.');
        
        await client.query(createTableSQL);
        console.log('Table created or already exists.');
    } catch (e) {
        console.error('Error executing query:', e.message);  // Log specific error message
    } finally {
        await client.end();
        console.log('Connection closed.');
    }
}

main();
