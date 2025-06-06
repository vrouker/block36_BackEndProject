import db from "../client.js";


//createEra - returns the created era according to the details provded
export async function createEra({name, years_ago}){
    const sql = `
        INSERT INTO era (name, years_ago)
        VALUES ($1, $2)
        RETURNING *;
    `

    const {rows: era} = await db.query(sql, [name, years_ago])

    return era[0]
};



//getAllEras()
export async function getAllEras(){
    const sql = `
        SELECT * FROM era;
    `;

    const {rows: eras} = await db.query(sql);
    return eras;
};



//getEraById(id)
export async function getEraById(id){
    const sql = `
        SELECT * FROM era WHERE id=$1;
    `;

    const {rows: era} = await db.query(sql, [id]);

    return era[0];
};



//updateEra(id, data)
export async function updateEra({id, name, years_ago}){
    const sql = `
        UPDATE era SET name=$1, years_ago=$2 WHERE id=$3 RETURNING *;
    `;

    const {rows: era} = await db.query(sql, [name, years_ago, id]);

    return era[0];
};




//deleteEra(id)
export async function deleteEra(id){
    const sql = `
        DELETE FROM era WHERE id=$1 RETURNING *;
    `;

    const {rows} = await db.query(sql, [id]);

    return rows;
}