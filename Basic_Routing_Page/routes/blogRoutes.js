const express = require('express')
const router = express.Router()

//Import from controller
const blogController = require('../controllers/blogController')



// GET
// router.get('/', (req, res)=>{
//     //In blogControllers
// })
router.get('/', blogController.blog_index)
//In blogControllers


//Read/GET/ Send the actual form 
router.get('/create',blogController.blog_create_get)

//Post
router.post('/', blogController.blog_create_post)

//Get Route Parameter = id = get a single blog
router.get('/:id', blogController.blog_details)


//Delete using id
router.delete('/:id', blogController.blog_delete)


module.exports =router
