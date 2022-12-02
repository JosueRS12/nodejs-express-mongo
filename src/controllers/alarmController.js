import {Alarm} from '../models/alarm.js';
import {AlarmCron} from '../scheduler/alarmCron.js';

const alarmController = {
  create: function(req, res){
    var data = req.body.alarm;
    var alarm = new Alarm();
     
    alarm.user_id = data.user_id;
    alarm.hour = data.hour;
    alarm.minute = data.minute;
    alarm.repeat = data.repeat;
    alarm.status = data.status;
    alarm.label = data.label
    
    alarm.save((err, userSaved)=>{

      if(err){
        return res.status(500).send({
          data: {
            error: "No ha sido posible crear la alarma"
          }
        });
      }

      //init cron
      let myAlarm = new AlarmCron(alarm);
      myAlarm.scheduleAlarm();
      
      return res.status(201).send({
        data: {
          message: "Alarma creada", 
          body: alarm
        }
      });
    });
  },

  change_status: function(req, res){
    var id = req.params.id;
    var status = req.body.alarm.status;
    var alarm = Alarm.findById(id, (err, alarm)=>{
      alarm.status = status;
      if(err){
        return res.status(500).send({
            data: {
              error: "No se ha encontrado la alarma"
            }
          });
      }
      alarm.save((err, userSaved)=>{
        if(err){
          return res.status(500).send({
            data: {
              error: "No ha sido posible actualizar el estado de la alarma"
            }
          });
        }
        
        return res.status(200).send({
          data: {
            message: "Estatus de la alarma cambiado", 
            status: alarm.status
          }
        });
      });
    });
  },

  delete: function(req, res){
    var id = req.params.id;
    Alarm.findByIdAndDelete(id, (err, alarm)=>{
      if (alarm == null){
        return res.status(404).send({
          data: {
            error: `La alarma con id ${id} no existe`
          }
        });
      }
      if (err){
        return res.status(500).send({
          data: {
            error: "No ha sido posible eliminar la alarma"
          }
        });
      }
      return res.status(200).send({
        data: {
          message: `Alarma eliminada`
        }
      })

    });

  },

  list: function(req, res){
    Alarm.find({}, (err, alarms) => {
      if (err){
        return res.status(500).send({
          data: {
            error: "No ha sido posible listar las alarmas",
            length: 0
          }
        });
      }
      return res.status(200).send({
        data: {
          body: alarms,
          length: alarms.length 
        }
      })
    })
  },

  deleteAll: function(req, res){
    Alarm.deleteMany({}, (err, deleted)=>{
      if (err){
        return res.status(500).send({
          data: {
            error: "No ha sido posible eliminar las alarmas"
          }
        });
      }
      return res.status(200).send({
        data: {
          message: `Alarmas eliminadas`
        }
      })

    });

  }
} 

export {alarmController}

