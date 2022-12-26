import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    workID: {type: String, required: true},
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UsersModel'
    },
    postText: {type: String, required: true}
}, {collection: 'posts'})

export default postsSchema