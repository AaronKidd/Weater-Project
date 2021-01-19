const express = require("express")
const app = express();
const https = require("https")
const bodyParser = require("body-parser")
port = 3000

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
});


app.post("/", (req,res)=>{
    console.log(req.body.city)
    const unit = "metric"
    const city = req.body.city
    const apikey = "b351fe24dfbeeb5c7ccd09c1ceb98c58"
      https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit, (response)=>{
        console.log(response.statusCode)

        response.on("data",(data)=>{
            const weather = JSON.parse(data)
            console.log(weather.weather[0].description)
            const icon = "https://openweathermap.org/img/wn/"+weather.weather[0].icon +"@2x.png"
            res.write("<h1>The temperture in "+ weather.name +" is " + weather.main.temp + "C with " + weather.weather[0].description+"</h1>");
            res.write("<img src="+icon+">")
            res.send()
        })
    })
    
})

app.listen(port, ()=>{
    console.log("Server is listening on port: " + port)
});