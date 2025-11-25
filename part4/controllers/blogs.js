const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req,res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs);
    })
})

blogRouter.post('/', async (req,res) => {
    /*
    const blog = new Blog(req.body);
    blog.save().then(result => {
    res.status(201).json(result);
    })
    */
   try{
    const {title, author, url, likes} = req.body;
    const blog = new Blog ({
        title,
        author,
        url,
        likes:likes ?? 0
    })

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
   }
   catch(error){
    next(error);
   }

})

module.exports = blogRouter;