const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
    
  name : {type :String,
    required : true, },


        city: {
          type: String,
          required: true,  
        },


});

const ConstModel = mongoose.model("constituencies" , constituencySchema)

module.exports = ConstModel