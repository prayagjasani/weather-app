
const express = require("express");
const app = express();
const https = require("https");
const bodyParser =  require("body-parser");

    app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function (req,res){
    const city = req.body.cityname;
    const key = "234ec8c031a0791f68fee151bab75fba"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+ unit ;
    https.get(url ,function(response){
    response.on("data",function (data){
       const weathetData = JSON.parse(data);
        const temp = weathetData.main.temp; 
        const weateherdDescrioption = weathetData.weather[0].description; 
        const imgcode = weathetData.weather[0].icon;
        const imgURL = "https://openweathermap.org/img/wn/"+ imgcode +"@2x.png"
        res.write("<h1>temp is "+temp+" C in "+city+"</h1>")
        res.write("<h1> weather discription is "+ weateherdDescrioption + "<v/h1>")
        res.write("<img src = "+imgURL +"></img>")
        res.send()
        
    })
    })
})
app.listen(3000, function (){
    console.log("server start at port 3000.")
})