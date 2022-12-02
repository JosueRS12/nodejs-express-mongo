import {User} from '../models/user.js'

const userController = {
  create: function(req, res){
    var data = req.body;
    var user = new User();
     
    user.first_name = data.first_name;
    user._id = data.id;
    user.second_name = data.second_name;
    user.country = data.country;
    
    user.save((err, userSaved)=>{

      if(err){
        return res.status(500).send({
          data: {
            error: "No ha sido posible crear el usuario"
          }
        });
      }
      
      return res.status(201).send({
        data: {
          message: "Registro exitoso" 
        }
      });
    });

  }
} 

export {userController};
