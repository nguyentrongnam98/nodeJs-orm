import express from 'express';
import apiController from '../controllers/apiController';


let router = express.Router()

const initialApiRouter = (app) => {
  router.get('/users', apiController.getAllUser)
  router.get('/detail-user/:id', apiController.detailUser)
  router.post('/create-user', apiController.createUser)
  router.put('/edit-user/:id', apiController.editUser)
  router.delete('/delete-user/:id', apiController.deleteUser)
  return app.use('/api/v1',router)
}

export default initialApiRouter;