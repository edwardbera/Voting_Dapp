const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ConstModel = require('./models/constituencies');
const CandiModel = require('./models/candidates');
const parametersModel = require('./models/parameters');
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//mongoose.connect('mongodb://localhost:27017/voter');
app.use(cors());
//mongoose.connect('mongodb+srv://username:password@cluster0.f1o1r.mongodb.net/voter');
mongoose.connect('mongodb+srv://Mongo1:username@mongo1.rprqi.mongodb.net/voter');

app.get("/getConstituencies", (req, res )=>{
    ConstModel.find({}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });


});


app.get("/getCandidates", (req, res )=>{
    CandiModel.find({}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });

});

app.get("/getCouncilorCandidates", (req, res )=>{
    CandiModel.find({'position' : 'Councilor'}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });

});


app.get("/getMPCandidates", (req, res )=>{
    CandiModel.find({'position' : 'National Assembly'}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });

});




app.get("/getPresidentialCandidates", (req, res )=>{
    CandiModel.find({'position' : 'President'}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });

});
app.post("/addParameters",jsonParser, (req , res) =>{
    res.send("POST Request Called");
    //console.log(req.body);
/*
   
*/

 
param1 = new parametersModel(req.body);    
  param1.save(function (err, parametersModel) {
      if (err) return console.error(err);
      //console.log(param1.name + " saved to collection.");
      
    });


 
});





app.get("/getParameters", (req, res )=>{
    parametersModel.find({}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });

});

app.post("/resetParameters", (req , res) =>{
    
    parametersModel.deleteMany({}, (err, result) =>{

        if (err){

            res.json(err);

        }else{
            res.json(result);
        }
    });


});
app.listen(3002, () => {

console.log("SERVER RUNNING");
});

