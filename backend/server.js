import dotenv from 'dotenv';
import express from 'express';
import insertUsers from './databases/insertUsers.js';
import createTables from './databases/createTables.js';
import router from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
//create table
// createTables()
// insertUsers()

app.get("/", (req, res) => {
    res.send("Server is working!");
});
app.use("/api/auth", router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is runing ${PORT}`);
})