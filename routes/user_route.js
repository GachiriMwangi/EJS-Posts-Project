const express = require('express')
const router = express.Router() 
const {registerUser, loginUser, getMe, userLoginPage, registerUserPage} = require('./user')
const {protect} = require('../Middleware/authMiddleware')
const asyncHandler = require('express-async-handler')
const User = require('../models/users')
const Articles = require('../models/article')
const session = require('express-session')
const bcrypt = require('bcryptjs')

router.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
    })
  )

router.get('/getUser', protect,getMe)
router.get('/register', registerUserPage)
router.post('/register', registerUser)
router.get('/login', userLoginPage)
router.post('/login', 
asyncHandler(
    async (req, res) => {
       const {email, password} = req.body 
       // @ts-ignore
       req.session.username = await User.findOne({email}) 
       // @ts-ignore
       const user = req.session.username

       // @ts-ignore
       if(user && (await bcrypt.compare(password, user.password))){   
  
           res.status(200)
          // const token = generateToken(user._id)
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
))


module.exports = router