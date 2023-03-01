const mongoose = require('mongoose');

const parametersSchema = new mongoose.Schema({
    
  name : {type :String,
    required : true, },


        start : {
          type: String,
          required: true,  
        },

        end: {
            type: String,
            required: true,  
          },

});

const parametersModel = mongoose.model("parameters" , parametersSchema)

module.exports = parametersModel