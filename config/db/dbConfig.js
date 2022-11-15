import mongoose from 'mongoose'
import {env} from '../config.js';

try {
  await mongoose.connect(env.URL_DB);
  console.log("Database connected succesfully");
} catch (error) {
  console.log("Database connection failed");
  console.log(error);
}
