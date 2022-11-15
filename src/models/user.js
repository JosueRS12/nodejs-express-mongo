import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  second_name: String,
  country: String
});

const User = mongoose.model('User', userSchema);

export {User};

