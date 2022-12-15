import mongoose from "mongoose";

    // user: {type: String, required: true, unique: true}, // should ref to users table
const reviewsSchema = mongoose.Schema({
    workID: {type: String, required: true},
    reviewText: {type: String, required: true}
}, {collection: 'reviews'})

export default reviewsSchema