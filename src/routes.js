import {userController} from './controllers/userController.js' 
import express from 'express'

const router = express.Router();


// user routes
router.post('/user/create-user', (req, res) => userController.create(req, res));


export {router};
