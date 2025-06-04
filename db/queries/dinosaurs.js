import db from "../client.js";


//createDino - returns the dinosaur created according to the details provided
export async function createDinosaur({name, mass, lifespan, diet, era_id}){
    const sql = `
        INSERT INTO dinosaurs (name, mass, lifespan, diet, era_id) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const {rows: dinosaur} = await db.query(sql, [name, mass, lifespan, diet, era_id])

    return dinosaur[0]
        //[0] returns just the dinosaur object and not the whole array
};





//getAllDinos() - returns all dinos in the db
export async function getAllDinos(){
    const sql = `SELECT * FROM dinosaurs;`;
    const {rows: dinosaurs} = await db.query(sql);
    return dinosaurs;
};




//getDinoById(id) - returns the dinosaur with the given id
export async function getDinoById(id){
    const sql = `
    SELECT *
    FROM dinosaurs
    WHERE id = $1;
    `;
    const {rows: dinosaur} = await db.query(sql, [id])
    return dinosaur[0];

};




//updateDino(id, data) - returns the updated dinosaur with the given id
export async function updateDino([id, name, mass, lifespan, diet, era_id]){
    const sql =`
    UPDATE dinosaurs
    SET name = $1, mass = $2, lifespan = $3, diet = $4, era_id = $5
    WHERE id = $6
    RETURNING *;
    `;
    const {rows: dinosaur} = await db.query(sql, [name, mass, lifespan, diet, era_id, id]);
    return dinosaur[0];
};




//deleteDino(id) - returns a success message if the dino with the given id is deleted
export async function deleteDino(id){
    const sql = `
    DELETE FROM dinosaurs WHERE id = $1
    RETURNING *;
    `;
    const {rows} = await db.query(sql, [id]);
    return rows;
};
