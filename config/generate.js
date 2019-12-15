import blogPaths from '../contents/blogs'

export default {
  routes: []
    .concat(blogPaths.map((blogPath) => `/blog/${blogPath}`))
    .concat(blogPaths.map((blogPath) => `/blog/${blogPath}/amp`))
    .concat(blogPaths.map((blogPath) => `/en/blog/${blogPath}`))
    .concat(blogPaths.map((blogPath) => `/en/blog/${blogPath}/amp`))
}
