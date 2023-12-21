import express from "express";
import connectToMongoDB from "./database.js";

const app = express();

app.listen(3000, () => {
  connectToMongoDB();
  console.log("Server started");
});
