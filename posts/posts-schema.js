import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
    author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UsersModel'
    },
      description: {type: String, required : true},
      likes: [],
      comments:[],
      image: {type: String}
    }, {collection: 'posts'}
);


export default postSchema