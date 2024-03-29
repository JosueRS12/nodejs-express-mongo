import cron from  'node-cron'; 
import {Alarm} from '../models/alarm.js';
import fetch from 'node-fetch';

export class AlarmCron {

  #alarm;
  id_cron;
  #delay;

  constructor(alarm){
    this.#alarm = alarm;  
    this.id_cron = null;
    switch(this.#alarm.breed){
      case 'little':
        this.delay = 5000;
        break;
      case 'mid':
        this.delay = 7000;
        break;
      case 'big':
        this.delay = 10000;
        break;
      default:
        this.delay = 4000;
        break;
    }
  }

  scheduleAlarm(){
    let hour = this.#alarm.hour;    
    let minute = this.#alarm.minute;    
    let repeat = this.#alarm.repeat;
    let task = cron.schedule(`${minute} ${hour} * * *`, () =>  {
      console.log(`triggered alarm at: ${hour}:${minute}`);
      ////////////////////////////////
      this.#triggerAlarm();
      ////
      //switch case
      switch (repeat){
        case "once":
          this.#alarm.status = false;
          this.#alarm.save((err, alarmSaved) => {
            if (err){
              console.log("Error al cambiar de estado la alarma");
              return {error: "Hubo un error en el cambio de estado"}
            }
          });
          break;
        default:
      }
    }, {
      scheduled: true,
      timezone: "America/Bogota"

    });
    this.#alarm.status == true ? task.start() : task.stop() 
    this.#alarm.id_cron = task.options.name;
    this.#alarm.save();
  } 

  async #triggerAlarm(){
    try{

      let resOpen = await fetch('http://192.168.133.192:80/nodemcu-api/open',{
        headers: {
          "Content-type": "text/json"
        },
        method: 'POST'
      });
      resOpen = await resOpen.json();
    } catch(err){

      console.error("Error al intentar abrir la compuerta: ", err);

    }
    setTimeout(async ()=>{

      try{ 
        let resClose = await fetch('http://192.168.133.192:80/nodemcu-api/close',{
          headers: {
            "Content-type": "text/json"
          },
          method: 'POST'
        })
        resClose = await resClose.json();

      } catch(err){
        console.error("Error al intentar cerrar la compuerta: ", err);
      }
    }, this.delay);

  }

}

