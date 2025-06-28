const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Express ^5.1.0 handles async errors automatically, similar to express-async-errors library
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter