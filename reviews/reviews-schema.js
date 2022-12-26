import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    workID: {type: String, required: true},
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UsersModel'
    },
    reviewText: {type: String, required: true}
}, {collection: 'reviews'})

export default reviewsSchema