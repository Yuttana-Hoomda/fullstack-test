import express from 'express';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: 'false',
    sameSite: 'lax',
    maxAge: 30*24*60*60*1000
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: 'Please provide all required fields'
        });
    };

    const user = await pool.query(`
        SELECT * 
        FROM users 
        WHERE email = $1`, [email]);

    if (user.rows.length === 0) {
        return res.status(400).json({
            message: 'Invalid credentials'
        })
    };

    const userData = user.rows[0];

    if (userData.password != password) {
        return res.status(400).json({
            message: 'Invalid credentials'
        })
    }

    const token = generateToken(userData.id);
    res.cookie('token', token, cookieOptions);
    res.json({
        user: {
            id: userData.id,
            email: userData.email,
        }
    })
})

router.get("/user", protect, async (req, res) => {
    res.json(req.user);
})

router.post("/logout", (req, res) => {
    res.cookie("token", "", { ...cookieOptions, maxAge: 1});
    res.json({ message: "Log out success"})
})

export default router