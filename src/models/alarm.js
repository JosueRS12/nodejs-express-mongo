import mongoose from 'mongoose';
const { Schema } = mongoose;

const alarmSchema = new Schema({
  user_id: Number,
  hour: Number,
  minute: Number,
  repeat: String,
  status: Boolean,
  label: String
});

const Alarm = mongoose.model('Alarm', alarmSchema);

export {Alarm};
