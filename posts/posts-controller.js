import * as postsDao from './posts-dao.js';
import * as usersDao from "../users/users-dao.js";

const PostsController = (app) => {
  app.post('/api/posts', createPost);
  app.get('/api/posts', getAllPosts);
  app.get('/api/posts/:author', findPostsByAuthor)
  app.put('api/posts/:uid', updatePost)
  app.delete('api/posts/:uid', deletePost)
}

const createPost = async (req, res) => {
  const post = req.body
  //const currentUser = req.session['currentUser']
  post.author = "6397bc55ba970668ff6a12be"//currentUser._id
  const actualPost = await postsDao.createPost(post)
  res.json(actualPost)
}
const getAllPosts = async (req,res)=> {
  const posts = await postsDao.findAllPosts()
  res.json(posts)
}
const findPostsByAuthor = async (req, res) => {
  const author = req.params.author
  const posts = await postsDao.findPostsByAuthor(author)
  res.json(posts)
}
const deletePost=async(req,res)=>{
  const postId=req.params.uid
  const status = await postsDao.deletePost(postId);
  const currentUser = req.session['currentUser']
  const author = currentUser._id
  const posts = await postsDao.findPostsByAuthor(author)
  res.json(posts)
}

const updatePost=async(req,res)=>{
  const postId=req.params.uid
  const updates = req.body;
  const status = await postsDao.updatePost(postId, updates);
  res.json(status)

}

export default PostsController;