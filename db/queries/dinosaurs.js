import db from "../client.js";


//returns the dinosaur created according to the details provided
export async function createDinosaur({name, mass, lifespan, diet, era_id}){
    const sql = `
        INSERT INTO dinosaurs (name, mass, lifespan, diet, era_id) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const {rows: dinosaur} = await db.query(sql, [name, mass, lifespan, diet, era_id])

    return dinosaur[0]
        //[0] returns just the dinosaur object and not the whole array
};