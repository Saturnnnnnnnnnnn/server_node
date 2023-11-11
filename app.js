const express = require("express");
const app = express();
const cloudinary = require("cloudinary").v2;
require('dotenv').config()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.get("/", (req, res) => {
  res.json({ message: "blablabla" });
});

// Image upload API using async/await
app.post("/image-upload", async (req, res) => {
  try {
    const data = {
      image: req.body.image
    };

    const result = await cloudinary.uploader.upload(data.image);
    res.status(200).send({
      message: "success",
      result
    });
  } catch (error) {
    res.status(500).send({
      message: "failure",
      error
    });
  }
});

module.exports = app;
