import reviewsModel from "./reviews-model.js";

export const postReview = (review) => reviewsModel.create(review)

export const findReviewsByWorkID = async (workID) =>
    await reviewsModel.find({workID}).exec() // TODO: add reviewer once login is ready