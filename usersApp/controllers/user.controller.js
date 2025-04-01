const User = require("../models/user.model");
const userService = require("../services/user.services")
const bcrypt = require("bcrypt")

exports.findAll = async(req, res) => {
  console.log("Find all users from collection users");

  try {
    // const result = await User.find()
    const result = await userService.findAll()
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading users", err)
    res.status(400).json({status: false, data: err});
  }
}

exports.findOne = async(req, res) => {
  console.log("Find user with specific username");
  let username = req.params.username;

  try {
    // const result = await User.findOne({username: username});
    const result = await userService.findOne(username)
    if(result) {
      res.json({status: true, data: result});
    } else{
      // Δεν επιστρεφει err γιατι μπορει να επιστρεψει κενο δλδ να μην υπαρχει user
      result.status(400).json({status: false, data: "User not exist"})
    }
  } catch(err) {
    console.log("Problem in finding user", err)
    // Ενω εδω επιστρεφω err γιατι υπαρχει προβλημα στο ερωτημα μου
    res.status(400).json({status: false, data: err})
  }
}

exports.create = async(req, res) => {
  console.log("Create User")
  let data = req.body
  const SaltOrRounds = 10
  const hashedPassword = await bcrypt.hash(data.password, SaltOrRounds)

  const newUser = new User({
    username: data.username,
    password: hashedPassword,
    name: data.name,
    surname: data.surname,
    email: data.email,
    address: {
      area: data.address.area,
      road: data.address.road
    }
  })

  try {
    const result = await newUser.save()

    res.json({status: true, data: result})
  } catch (err) {
    console.log("Problem in creating User", err)
    res.json({status: false, data:err})
  }
}

exports.update = async(req, res) => {
  const username = req.body.username

  console.log("Update User with username: ", username)

  const updateUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: {
      area: req.body.area,
      road: req.body.road
    }
  }

  try {
    const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true})
    res.status(200).json({status: true, data: result})
  } catch (err) {
    console.log("Problem in updating user", err)
    res.status(400).json({status: false, data: err})
  }
}

// Γινεται με αυτη την κληση http://localhost:3000/api/users/nikos5
exports.deleteByUsername = async(req, res) => {
  const username = req.params.username
  console.log("Delete user with username", username)

  try {
    const result = await User.findOneAndDelete({username: username})
    res.status(200).json({status: true, data: result})
  } catch (err) {
    console.log("Problem in deleting user", err)
    res.status(400).json({status: false, data: err})
  }
}

// Γινεται με αυτη την κληση http://localhost:3000/api/users/nikos5/email/nik@apple.gr
exports.deleteByEmail = async (req, res) => {
  const username = req.params.username
  const email = req.params.email
  console.log("Delete User by Email", email)

  try {
    const result = await User.findOneAndDelete({email: email})
    res.status(200).json({status: true, data: result})
  } catch (err) {
    console.log("Problem in deleting user", err)
    res.status(400).json({status: false, data: err})
  }
}
