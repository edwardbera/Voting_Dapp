const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    
  name : {type :String,
    required : true, },


        position: {
          type: String,
          required: true,  
        },

        party: {
            type: String,
            required: true,  
          },

});

const CandiModel = mongoose.model("candidates" , candidateSchema)

module.exports = CandiModel