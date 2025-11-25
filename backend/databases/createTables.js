import pool from "../config/db.js";

const createTables = async () => {
    const tableUsers = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
        )
    `;

    try {
        await pool.query(tableUsers);
        console.log("User table created if not exits")
    } catch (error) {
        console.log("Error creating user table", error)
    }
    // const tableTransactions = `
    //     CREATE TABLE IF NOT EXITS transactions (
    //     transaction_id
    //     )
    // `
    // const tableBalance = `
    //     CREATE TABLE IF NOT EXITS transactions (
        
    //     )
    // `
}

export default createTables;