var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var compiler = require('compilex');
const { exec } = require('child_process');


var app = express();
app.use(bodyParser());

var option = {stats:true};
compiler.init(option);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendfile(__dirname + "/gat.html");
});

app.post("/compilecode",(req,res)=>{
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    if(lang === "C" || lang === "C++"){
      if(inputRadio === "true"){
        var envdata = {OS: "windows",cmd:"g++",options:{timeout:1000}};
        compiler.compileCPPWithInput(envdata,code,input,function(data){
          if(data.error){
              res.send(data.error);
          } else{
              res.send(data.output);
          }
      });
      }else{
        var envdata = {OS: "windows",cmd:"g++",options:{timeout:1000}};
        compiler.compileCPP(envdata,code,function(data){
          if(data.error){
              res.send(data.error);
          } else{
              res.send(data.output);
          }
      });
      }
    }

    if(lang==="Python"){
        if(inputRadio === "true"){
            var envdata = {OS: "windows"};
            compiler.compilePythonWithInput(envdata,code,input,function(data){
                if(data.error){
                    res.send(data.error);
                } else{
                    res.send(data.output);
                }
            });
        } else{
            var envdata = {OS: "windows"};
            compiler.compilePython(envdata,code,function(data){
                res.send(data);
            });
        }
    }    
});

app.get("/fullStat",function(req,res){
    compiler.fullStat(function(data){
        res.send(data);
    });
});

app.listen(8080);
compiler.flush(function(){
    console.log("temporary files flushed");
});