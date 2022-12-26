import * as followersDao from './follows-dao.js'

const FollowsController = (app) => {
    app.post('/api/follows', followUser);
    app.get('/api/follows/:followedID/followers', getFollowersByUserID);
    app.get('/api/follows/:followerID/following', getFollowingByUserID);
}

const followUser = async (req, res) => {
    const follow = req.body // Followed field comes from client
    follow.follower = req.session['currentUser']._id;
    if (follow.followed === follow.follower) {
        res.sendStatus(403);
        return;
    }
    const existingFollow = await followersDao.findFollow(follow);
    if (existingFollow) {
        res.sendStatus(403);
        return;
    }
    const actualFollow = await followersDao.followUser(follow)
    res.json(actualFollow)
}

const getFollowersByUserID = async (req, res) => {
    const followedID = req.params.followedID;
    const followers = await followersDao.getFollowersByUserID(followedID);
    res.json(followers);
    console.log("Returning followers")
    console.log(followers);
}

const getFollowingByUserID = async (req, res) => {
    const followerID = req.params.followerID;
    const followed = await followersDao.getFollowingByUserID(followerID);
    res.json(followed);
    console.log("Returning following")
    console.log(followed);
}

export default FollowsController;