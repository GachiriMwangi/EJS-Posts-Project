const Article = require('../models/article')
const User = require('../models/users')
const {ObjectId} = require('mongodb')


async function getMyPosts(req, res){
  const articles = await Article.find({
   writer: req.writer.id
  })
  res.status(200).json(articles)      
}

async function newPostPage (req, res) {
    async function findUser(){
      const user = await User.findOne({
         _id: new ObjectId('649d9d60e3f0e6010e52a9c1')
      })
      if(user){
       res.render('Users/new_user')
      }
      else{
              res.render('login/login_user')
      }
    } 
    findUser() 
    
}

async function getSingleArticle(req, res){
   let article = await Article.findOne({slug: req.params.slug})
   if(article == null) res.redirect('/')
   const user = await User.findOne({email: 'alehadndro@gmail.com'})
   if(user){
      res.render('home/show', {article: article, user: user})
   }
   else{
        res.render('articles/show', {article: article}) 
   }

   }

   //Edit article 
  async function editPostPage(req, res) {
      const article = await Article.findOne({slug: req.params.slug})

      res.render('articles/edit', {article: article})
   }

async function postAnArticle(req, res) {
   const {title, description, markdown} = req.body
   if(!title || !description || !markdown){
      res.status(400) 
      throw new Error('Please fill in the required details. ')
   }
      const article = await Article.create({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    writer: req.writer.id

})
 try{
   const user = await User.findOne({email: 'vite@gmail.com'})
   if(user){
      
   }
        else{
             res.redirect(`/articles/${article.slug}`) 
        }


}
catch(e) {
   res.render('articles/new', {article: article})
}
 
}

async function editPost(req, res){
   req.article = await Article.findOne({slug: req.params.slug})
   let article = req.article
   article.title = req.body.title
   article.description = req.body.description
   article.markdown = req.body.markdown

try{

     res.redirect(`/articles/${article.slug}`)
}
catch(e) {
   res.render('articles/edit', {article: article})
}
}
//Delete an article 
   
 async function deletePost(req, res){
   try{
const deleteArticle = await Article.findOne({slug: req.params.slug})
if(deleteArticle){
   await Article.deleteOne({slug: req.params.slug})
    res.redirect('/')
}
else{
   res.status(400).json({msg: 'Article not found.'})
}

   }
   catch(e){
   console.log(e.message)
   }

}
 
module.exports = {
     newPostPage, 
     getSingleArticle,
     postAnArticle, 
     editPostPage,
     editPost, 
     deletePost, 
     getMyPosts
    }