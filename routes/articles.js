const express = require('express')
const {getMyPosts, newPostPage, getSingleArticle, postAnArticle, editPostPage, editPost, deletePost} = require('./articles_route')
const {protect} = require('../Middleware/authMiddleware')
const router = express.Router()

router.get('/myposts', protect,getMyPosts)
router.get('/new', newPostPage)

router.get('/:slug', getSingleArticle)
router.post('/', protect, postAnArticle)
router.get('/edit/:slug', protect, editPostPage)
router.put('/:slug', protect, editPost)
router.delete('/:slug', protect, deletePost)


module.exports = router   