const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({status: false, message: "Access denied. No token provided"})
  }

  const secret = process.env.TOKEN_SECRET

  try {
    const decoded = jwt.verify(token, secret)
    console.log(decoded);
    next()
  } catch (err) {
    return res.status(403).json({status: false, data: err})
  }
}

module.exports = { verifyToken }