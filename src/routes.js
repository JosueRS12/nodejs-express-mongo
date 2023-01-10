import {userController} from './controllers/userController.js' 
import {alarmController} from './controllers/alarmController.js' 
import express from 'express'

const router = express.Router();


// user routes
router.post('/user/create-user', (req, res) => userController.create(req, res));
router.post('/alarm/create', (req, res) => alarmController.create(req, res));
router.put('/alarm/status/:id', (req, res) => alarmController.change_status(req, res));
router.delete('/alarm/remove/:id', (req, res) => alarmController.delete(req, res));
router.delete('/alarm/removeAll', (req, res) => alarmController.deleteAll(req, res));
router.get('/alarm/list', (req, res) => alarmController.list(req, res));
router.post('/alarm/set-breed/:user_id', (req, res) => alarmController.setBreed(req, res));


export {router};
