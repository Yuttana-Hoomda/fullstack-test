import pool from "../config/db.js";

const insertUsers = async () => {
    const insert = `
    INSERT INTO users (email, password)
    VALUES 
        ('abc@gmail.com', '123456'),
        ('def@gmail.com', '654321')
    ON CONFLICT (email) DO NOTHING
    `;

    try {
        await pool.query(insert)
        console.log("Insert user success if don't exit")
    } catch (error) {
        console.log("Error to insert user", error)
    }
}

export default insertUsers;