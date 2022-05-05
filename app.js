const express = require("express");
const app = express();
const userModel = require("./Models/user");
const restaurantModel=require("./Models/restaurant")
const bodyParser = require("body-parser");
const cors = require("cors");
// const data=require("./data.json")


app.use(bodyParser.json([]));

app.use(cors());

app.get("/", (req, res) => {
  // console.log(data);
  res.send("Welcome to Home page my book api");
});

app.post("/user", async (req, res, next) => {
  try {
    // console.log("17",req.body);
    let userDetail = req.body
    let response = await userModel.insertMany([userDetail]);
    // console.log("19",response);
    res.json(response);
  } catch (error) {
      // console.log("22");
    res.json(response);
  }
});
app.post("/restaurant", async (req, res, next) => {
  try {
    // console.log("29",req.data);
    let restaurnatDetail = req.body
    let response = await restaurantModel.insertMany(restaurnatDetail);
    // console.log("32",response);
    res.json(response);
  } catch (error) {
      // console.log("35");
    res.json(response);
  }
});

app.get("/user", async (req, res) => {
  try {
    let response = await userModel.find({});
    // console.log(response);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/restaurant", async (req, res) => {
  try {
    let response = await restaurantModel.find({});
    // console.log(response);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/restaurant/:username", async (req, res) => {
  try {
    let response = await restaurantModel.find({"_id":req.params.username});
    console.log("66",response);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = app;
