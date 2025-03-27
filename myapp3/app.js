const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs");

app.get("/create", (req, res) => {
  console.log("Create Page")
  res.render("form", {})
})

app.post("/user", (req, res) => {
  console.log("User Post")

  let data = req.body;
  console.log("Data", data)

  let username = data.username
  let email = data.email

  res.render("user", 
    {
      data1: username,
      data2: email
    }
  )
})

app.get("/users", (req, res) => {
  console.log("Users Page")

  const users = [
    {
      "username": "nikos",
      "email": "nik@apple.gr"
    },
    {
      "username": "themis",
      "email": "themis@google.gr"
    }
  ]

  res.render("users", {users})
})

app.listen(port, () => {
  console.log("Server is up!")
})