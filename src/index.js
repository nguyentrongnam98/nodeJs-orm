
import express from 'express';
import dotenv from 'dotenv';
import configViewEngine from './config/configViewEngine';
import initialRouter from './router/web';
import initialApiRouter from './router/api';
import morgan from 'morgan';
const app = express();
configViewEngine(app)
dotenv.config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(morgan('combined'))


initialRouter(app)
initialApiRouter(app)
app.use((req,res) => {
    return res.render('404.ejs')
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running with port ${process.env.PORT}`)
})

