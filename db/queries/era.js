import db from "../client.js";


//returns the created era according to the details provded
export async function createEra({name, years_ago}){
    const sql = `
        INSERT INTO era (name, years_ago)
        VALUES ($1, $2)
        RETURNING *;
    `

    const {rows: era} = await db.query(sql, [name, years_ago])

    return era[0]
};