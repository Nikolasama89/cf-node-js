import express from "express";
import { greet } from "./utils";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Typescript");
});

app.get("/greetings", (req, res) => {
  const message = greet("World 2");
  res.send(message);
})

app.listen(port, () => {
  return console.log("Server is Up")
})