import express from "express";
import path from "path";
import hbs from "hbs";
import { geocode } from "../src/utils/geocode.js";
import { forecast } from "../src/utils/forecast.js";

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jay Han"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Jay Han"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Jay Han"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(req.query.address, (error, data={}) => {
    if (error) {
      return res.send({error});
    }

    forecast(data.latitude, data.longitude, (error, forecastData={}) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        location:data.location,
        summary:forecastData
        });
    });
  }); 
});

app.get("/products", (req, res) => {
  if (!req.query.hello) {
    return res.send({
      error: "You must provide a product term"
    });
  }

  res.send({
    products: [req.query.hello]
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jay Han",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jay Han",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("Server is on PORT 3000");
});
