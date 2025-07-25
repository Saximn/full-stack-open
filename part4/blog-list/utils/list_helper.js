const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(
      (sum, blog) => {
        const likes = blog.likes
        return sum + likes
      },
      0
    )
}

module.exports = {
  dummy,
  totalLikes
}