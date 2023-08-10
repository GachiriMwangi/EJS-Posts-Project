const Article = require('../models/article')
const User = require('../models/users')
const {ObjectId} = require('mongodb')

async function getAllArticles(req, res){
   const articles = await Article.find()
   .sort({createdAt: 'desc'})
   const user = User.findOne({email: 'groot@gmail.com'})
   res.render('home/index', { articles: articles, user: user})
}

async function getMyPosts(req, res){
  const articles = await Article.find({
   writer: req.writer.id
  })
  res.status(200).json(articles)      
}

async function newPostPage (req, res) {
   
       res.render('home/new', {article: new Article()})
    
}

async function getSingleArticle(req, res){
   let article = await Article.findOne({slug: req.params.slug})
   if(article == null) res.redirect('/')
   
      res.render('home/show', {article: article})
      }

   //Edit article 
  async function editPostPage(req, res) {
      const article = await Article.findOne({slug: req.params.slug})

      res.render('home/edit', {article: article})
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
    writer: req.writer
}) 
//
 try{
   const user = await User.findOne({email: 'vite@gmail.com'})
   if(user){
      res.redirect(`/logged-in-articles/${article.slug}`)
   }
        else{
             res.redirect(`/logged-in-articles/${article.slug}`) 
        }


}
catch(e) {
   res.render('home/new', {article: article})
}
 
}

async function editPost(req, res){
   req.article = await Article.findOne({slug: req.params.slug})
   let article = req.article
   article.title = req.body.title
   article.description = req.body.description
   article.markdown = req.body.markdown

try{
     await article.save()
     res.redirect(`/logged-in-articles/${article.slug}`)
}
catch(e) {
   res.render('logged-in-articles/edit', {article: article})
}
}
//Delete an article 
   
 async function deletePost(req, res){
   try{
      let deleted = req.params.slug
const deleteArticle = await Article.findByIdAndDelete(deleted)
if(deleteArticle){
res.redirect('/logged-in-articles')
}
else{
   res.status(400).json({msg: deleted})
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
     getMyPosts, 
     getAllArticles
    }