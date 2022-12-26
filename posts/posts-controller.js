import * as postsDao from './posts-dao.js'
import * as reviewsDao from "../reviews/reviews-dao.js";

const PostsController = (app) => {
    app.post('/api/posts', postPost);
    app.get('/api/posts', getPosts);
    app.delete('/api/posts/:postID', deletePost);
    app.get('/api/books/:workID/posts', getPostsByWorkID);
    app.get('/api/posts/:userID/posts', getPostsByUserID);
}

const postPost = async (req, res) => {
    const post = req.body;
    const poster = req.session['currentUser'];
    if (poster) {
        post.poster = poster._id;
        const newPost = await postsDao.postPost(post);
        res.json(newPost);
    }
    else {
        res.sendStatus(403); // Must be logged in to post reviews
    }
}

const getPosts = async (req, res) => {
    const posts = await postsDao.getPosts();
    res.json(posts);
    // res.json({reviewID});
}

const getPostsByWorkID = async (req, res) => {
    const workID = req.params.workID;
    const posts = await postsDao.findPostsByWorkID(workID);
    // console.log(reviews)
    res.json(posts);
}

const getPostsByUserID = async (req, res) => {
    const userID = req.params.userID;
    const posts = await postsDao.findPostsByUserID(userID);
    // console.log(reviews)
    res.json(posts);
}

const deletePost = async (req, res) => {
    const postID = req.params.postID;
    await postsDao.deletePost(postID);
    res.json(postID);
    // res.json({reviewID});
}

export default PostsController;