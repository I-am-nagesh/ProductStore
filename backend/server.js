import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("serevr is ready");
});

app.listen(5000, () => {
  console.log("server started");
});
