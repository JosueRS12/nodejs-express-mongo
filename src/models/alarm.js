import mongoose from 'mongoose';
const { Schema } = mongoose;

const alarmSchema = new Schema({
  user_id: Number,
  hour: Number,
  minute: Number,
  repeat: String,
  status: Boolean,
  label: String,
  id_cron: String,
  breed: String
});

const Alarm = mongoose.model('Alarm', alarmSchema);

export {Alarm};
