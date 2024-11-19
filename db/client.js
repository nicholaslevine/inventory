const { Client } = require('pg');
require('dotenv').config();

const SQL = `CREATE TABLE IF NOT EXISTS rackets(
id SERIAL PRIMARY KEY,
name TEXT,
weight INTEGER,
picture TEXT,
rating FLOAT
);`

async function main(){
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.database,
        password: process.env.password,
        port: process.env.port
    })
    try{
        await client.connect();
        await client.query(SQL);
    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.end();
    }
    
}
main();