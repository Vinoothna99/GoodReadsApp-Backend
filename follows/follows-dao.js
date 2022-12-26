import followsModel from "./follows-model.js";

export const followUser = (follow) => followsModel.create(follow)

export const findFollow = async (follow) =>
    await followsModel.findOne(follow)

export const getFollowersByUserID = async (followedUserID) =>
    await followsModel.find(
        {followed: followedUserID})
        .populate('follower') // Get all the followers of the given user
        .exec()

export const getFollowingByUserID = async (followerUserID) =>
    await followsModel.find({follower: followerUserID})
        .populate('followed') // Get all the users who follow the given user
        .exec()