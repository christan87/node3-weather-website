const dot = require("dotenv").config();
const path = require("path");
const hbs = require("hbs");

//loads custom scripts for geocoding and forecasts

const forecast = require("../src/utils/forecast");
const geocode = require("../src/utils/geocode");

const express = require("express");
const app = express();

//defines paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "./views/templates")
const partialsDir = path.join(__dirname, "./views/partials")

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

//setup static directory to serve
app.use(express.static(publicDir))

app.get("", (req, res)=>{
    res.render("index", {
        title: "Weather",
        name: "Chris"
    });
});

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        });
    }
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About Page",
        name: "Chris"
    })
});

app.get("/help", (req, res)=>{
    res.render("help", {
        title: "Help Page!",
        name: "Chris"
    })
});

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "Must include an address"
        });
    }

    geocode(req.query.address, (error, data)=>{
        if(error){
            return res.send({error});
        }
        const {lattitude, longitude, location} = data;
        forecast(lattitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });

    });

    // res.send({
    //     forrecast: "Windy with a 15% chance of rain", 
    //     location: "Philidelphia",
    //     address: req.query.address, 
    // })
});

app.get("/help/*", (req, res)=>{
    res.render("404", {
        message: "Help article not found!",
        name: "Chris",
        title: "Error 404"
    })
});

app.get("*", (req, res)=>{
    res.render("404", {
        message: "Page Not Found!",
        name: "Chris",
        title:"Error 404"
    });
});

app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("App Running...")
});