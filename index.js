const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
let userData = null;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/data", async (req, res) => {
  const obj = {
    name: req.body.name,
    email: req.body.email,
    un_id: req.body.un_id,
  };
  console.log(obj);

  try {
    const response = await axios.post("https://reqres.in/api/users", obj);
    console.log(response.data);
    userData = obj;
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/api/users/data", (req, res) => {
  res.json(userData);
  console.log(userData);
});

app.listen(3000, () => {
  console.log("Server started");
});
