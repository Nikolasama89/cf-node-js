const express = require("express");
const app = express();
const cors = require("cors")


app.use(express.json())
app.use(express.urlencoded({extended:false}));

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger")

const user = require("./routes/user.routes")
const userProduct = require("./routes/user.products.routes")
const auth = require("./routes/auth.routes")

app.use(cors({
  // ΔΕΝ ΕΙΝΑΙ ΚΑΛΗ ΠΡΑΚΤΙΚΗ ΤΟ ΑΣΤΕΡΑΚΙ, ΚΑΛΟ ΕΙΝΑΙ ΝΑ ΞΕΡΟΥΜΕ ΚΑΙ ΝΑ ΔΗΛΩΣΟΥΜΕ ΤΟ PORT
  // origin: "*"
  origin: ["http://localhost:4200", "http://localhost:3000"]
}))

app.use("/api/auth", auth)
app.use("/api/users", user);
app.use("/api/user-product", userProduct)

app.use("/", express.static("files"))

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument.options))

module.exports = app