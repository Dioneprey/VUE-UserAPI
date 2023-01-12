var User = require("../models/User")
var PasswordToken = require('../models/PasswordToken')
var jwt = require("jsonwebtoken")
var bcrypt = require ('bcrypt')
var validator = require("email-validator");

var secret = "something"

class UserController {
    async index(req,res) {
        var users = await User.findAll()
        res.json(users)
    }

    async findUser(req,res){
        var id = req.params.id
        var user = await User.findById(id)
        if(user == undefined){
            res.status(404)
            res.json({})
        }else{
            res.status(200)
            res.json(user)
        }
    }

    async create(req,res) {
        
        var {email, password, name} = req.body

        var resul = validator.validate(email)
        
        
        if(resul != true) {
            res.status(400)
            res.json("Invalid Email")
            return
        } 

        var emailExists = await User.findEmail(email)

        if(emailExists){
            res.status(406)
            res.json({err: "Email already taken"})
            return
        }

        await User.new(email,password,name)        
        res.status(200)
        res.json({status: "OK"})
    }

    async edit(req,res){
        var {id, name, role, email} = req.body
        var result = await User.update(id,email,name,role)
        if(result != undefined) {
            if(result.status){
                res.json("OK")
            }else{
                res.status("406")
                res.json({Error: "An error occurred on the server"})
            }
        }else{
            res.status(406).
            res.json({Error: "An error occurred on the server"})
        }
    }

    async remove(req,res){
        var id = req.params.id
        var result = await User.delete(id)

        if(result.status){
            res.status(200).send("OK")
        }else{
            res.status(406)
            res.json(result.err)
        }
    }

    async recoverPassword(req,res) {
        var email = req.body.email
        var result = await PasswordToken.create(email)
        if(result.status){
            res.status(200)
            res.json("" + result.token)
        }else {
            res.status(406)
            res.json(result.err)
        }
    }

    async changePassword(req,res) {
        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status){
            
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token)
            res.status(200)
            res.json("Password changed")
        }else {
            res.status(406)
            res.json("Invalid token")
        }
    }

    async login(req,res){
        var {email, password} = req.body
        
        var user = await User.findByEmail(email)

        if(user != undefined){

            var result = await bcrypt.compare(password,user.password)
            
            if(result){

                var token = jwt.sign({ email: user.email, role: user.role }, secret)
                res.status(200)
                res.json({token:token})

            } else {
                res.status(406)
                res.json("Wrong password. Please try again")
            }

        }else {
            res.json({Status: false})
        }
    }

}

module.exports = new UserController()