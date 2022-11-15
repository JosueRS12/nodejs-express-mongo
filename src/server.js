import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import {env} from '../config/config.js';
import '../config/db/dbConfig.js';
import {router} from './routes.js';

const app = express();

// default middlewares
app.use(morgan('combined'));

// CORS Origin
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/api', router);

app.listen(env.PORT, ()=>{
  console.log(`Server started on port ${env.PORT}`);
});
