const mongoose = require("mongoose")
const app = require("./app");
const port = 3000;

// Εισαγουμε το connection string της βασης που θέλουμε να κάνουμε connect
mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => {
      console.log("Connection to MongoDB established");
      app.listen(port, () => {
        console.log("Server is up")
      })
    },
    err => {console.log("Failed to connect to MongoDb", err);}
  )


