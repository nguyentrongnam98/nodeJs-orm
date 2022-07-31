
import express from 'express';
import dotenv from 'dotenv';
import configViewEngine from './config/configViewEngine';
import initialRouter from './router/web';
const app = express();
configViewEngine(app)
dotenv.config()

app.use(express.json())
initialRouter(app)
app.listen(process.env.PORT, () => {
    console.log(`Server is running with port ${process.env.PORT}`)
})

