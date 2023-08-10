const express = require('express')
const {getAllArticles, getMyPosts, newPostPage, getSingleArticle, postAnArticle, editPostPage, editPost, deletePost} = require('./logged_articles_route')
const {protect} = require('../Middleware/authMiddleware')
const router = express.Router()

router.get('/myposts', protect,getMyPosts)
router.get('/new', newPostPage)
router.get('/', getAllArticles)
router.get('/:slug', getSingleArticle)
router.post('/', postAnArticle)
router.get('/edit/:slug', editPostPage)
router.put('/:slug', editPost)
router.delete('/:slug', deletePost)


module.exports = router