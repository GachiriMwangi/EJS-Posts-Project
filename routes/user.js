const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../models/users")
const Articles = require('../models/article')
const secretKey = 'abc123'
const session = require('express-session')



const registerUser = asyncHandler(
    async (req, res) => {
       const {name, email, password, password2} = req.body
       if(!name || !email || !password || !password2) {
        res.status(400)
        throw new Error('Please insert the required details')
       }
       if(password !== password2){
        res.status(400)
        throw new Error('Passwords must match.')
       }
       //Check if it exists 
       const userExists = await User.findOne({email})
     if(userExists){
        res.status(400)  
        throw new Error('User already exists.')
     }

     
     const salt = await bcrypt.genSalt(10) 
     const hashedPassword = await bcrypt.hash(password, salt)
     const hashedPassword2 = await bcrypt.hash(password2, salt)

     const user = await User.create({
        name, 
        email, 
        password: hashedPassword, 
        password2: hashedPassword2, 
        gentoken: ''
        })

     if(user){
      let token = generateToken(user._id)
      user.updateOne({email: user.email}, {$set: { gentoken: token}})
        res.status(201)
        /*
        json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) */
            
        const articles = await Articles.find()
        .sort({createdAt: 'desc'})

      res.render('login/login_user', { articles: articles, user: user})
     }
     else{
        res.status(400) 
        throw new Error('Invalid User Data')
     }

}
) 
 //@get user users/get 

const loginUser = asyncHandler(
     async (req, res) => {
        const {email, password} = req.body 
        const user = await User.findOne({email}) 

        // @ts-ignore
        if(user && (await bcrypt.compare(password, user.password))){   
   
            res.status(200)
            const token = generateToken(user._id)
            res.status(200)
        const articles = await Articles.find().sort({createdAt: 'desc'})
        res.render('home/index', {articles: articles, user: user})     
        }
        else{
            res.status(400).json({
            msg: 'Invalid username or password!'
           })
          
        } 
}
)

const userLoginPage = (req, res) => {
res.render('login/login_user')
}

const registerUserPage = (req, res) => {
  res.render('Users/new_user')
}

const getMe = asyncHandler(
    async (req, res) => {
  // @ts-ignore
  const {_id, name, email} = await User.findById(req.writer.id)
  res.status(200).json({
    id: _id, 
    name, 
    email
  })
}
)
 
//Generate a token 
const generateToken = (id) => {
    // @ts-ignore
    return jwt.sign({id}, secretKey, {
        expiresIn: '30d'
    })
}

module.exports = {registerUser,
   loginUser,
   getMe,
   userLoginPage,
   registerUserPage}
