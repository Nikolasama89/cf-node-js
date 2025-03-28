const express = require("express")
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/", express.static("files"))

const logger = (req, res, next) => {
  let url = req.url
  console.log("Logger", req.body)
  let time = new Date()
  console.log("Received requests for " + url + " at " + time)
  
  next()
}

app.get("/", (req, res) => {
  res.send("This is the home page")
})


app.post("/user", logger, (req, res) => {
  let data = req.body
  let username = req.body.username
  let email = req.body.email

  console.log(data)
  res.send(`User Data: ${username}, ${email} `)
})

app.post("/userForm", (req, res) => {
  let data = req.body
  console.log("Data", data)
  res.send("UserForm Page")
})

app.use("/user1", (req, res) => {
  console.log("User 1")
  res.send("User 1 page")
})

app.use("/user2", (req, res) => {
  console.log("User 2")
  res.send("User 2 page")
})

app.use("/user2/hello", (req, res) => {
  console.log("User 2 Hello")
  res.send("User 2 page Hello")
})


app.listen(port, () => {
  console.log("Server is up!")
})