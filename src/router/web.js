import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router()

const initialRouter = (app) => {
  router.get('/', homeController.homePage)
  return app.use('/',router)
}

export default initialRouter;