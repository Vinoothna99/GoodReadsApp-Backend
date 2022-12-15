import postModel from "./posts-model.js";
import usersModel from "../users/users-model.js";

export const createPost= (post) =>
    postModel.create(post)

export const findAllPosts = async () =>
    await postModel.find()

export const deletePost =(postId)=>
    postModel.deleteOne({_id: postId})

export const findPostsByAuthor = async (author) =>
    await postModel.find({author}).exec()

export const updatePost = async (postId, postUpdates) =>
    await postModel.updateOne({_id: postId},
        {$set: postUpdates})
