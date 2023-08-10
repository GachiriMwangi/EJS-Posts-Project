const express = require('express') 
const app = express() 
const session = require('express-session')
require('dotenv').config()
const routesArticle = require('./routes/articles') 
const Articles = require('./models/article')
const User= require('./models/users')
const mongoose = require('mongoose') 
const methodoverride = require('method-override')
//connect to the database 
mongoose.connect('mongodb://localhost/Blog')
.catch((err) => console.warn(err))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use(methodoverride('_method'))

app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
    })
  )

app.use('/articles', routesArticle)
app.use('/users', require('./routes/user_route'))
app.use('/logged-in-articles', require('./routes/logged_articles'))

app.get('/', async (req, res) => {  
    const articles = await Articles.find()
    .sort({createdAt: 'desc'})
    const user = User.findOne({email: 'groot@gmail.com'})
    res.render('articles/index', { articles: articles, user: user})
})

app.get('/logged-in-articles', async (req, res) => {  
    const articles = await Articles.find()
    .sort({createdAt: 'desc'})
    const user = User.findOne({email: 'yobra@gmail.com'})
    res.render('home/index', { articles: articles, user: user})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))