import postsModel from "./posts-model.js";

export const postPost = (post) => postsModel.create(post)

export const getPosts = async (post) =>
    await postsModel.find().sort( { _id: -1 } )

export const findPostsByWorkID = async (workID) =>
    await postsModel.find(
        {workID})
        .populate('poster')// Include reviewer's fields
        .exec()

export const findPostsByUserID = async (userID) =>
    await postsModel.find({poster: userID}).exec()

export const deletePost = async (postID) =>
    await postsModel.deleteOne({_id: postID}).exec()