const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const UserRouter=express.Router()
const {UserModel}=require('../models/User.model');
UserRouter.post("/signup", async (req, res) => {
    const { Name, Email, Password, Role } = req.body;
    const existingUser = await UserModel.findOne({ Email });
  
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists. Please log in." });
    } else {
      try {
        bcrypt.hash(Password, 4, async (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          const newUser = new UserModel({ Name, Email, Password: hash, Role });
          await newUser.save();
  
          res.status(201).json({ msg: "New user has been registered" });
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  })


  UserRouter.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    try {
      const user = await UserModel.find({ Email })
      if (user.length > 0) {
        bcrypt.compare(Password, user[0].Password, (err, result) => {
          if (result) {
            let accessToken = jwt.sign({ id: user[0]._id }, process.env.accessKey, { expiresIn: "15m" })
            res.status(200).send({
              "msg": "Login Succesfull", "AcessToken": accessToken
            })
          } else {
            res.status(400).send({ "msg": "Password is incorrect" })
          }
        })
      } else {
        res.status(404).send({ "msg": "Email does not exist" })
      }
    } catch (error) {
      res.status(400).send({ "error": error.message })
    }
  })
  

  module.exports={
    UserRouter
  }