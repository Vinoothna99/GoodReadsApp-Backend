import reviewsModel from "./reviews-model.js";

export const postReview = (review) => reviewsModel.create(review)

export const findReviewsByWorkID = async (workID) =>
    await reviewsModel.find(
        {workID})
        .populate('reviewer')// Include reviewer's fields
        .exec()

export const findReviewsByUserID = async (userID) =>
    await reviewsModel.find({reviewer: userID}).exec()

export const deleteReview = async (reviewID) =>
    await reviewsModel.deleteOne({_id: reviewID}).exec()

export const getReviews = async () =>
    await reviewsModel.find().sort( { _id: -1 } )