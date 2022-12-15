import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    email: {type: String},
    role: {type: String, enum: ["READER", "MODERATOR", "AUTHOR"], default: "READER"}
}, {collection: 'users'})

export default usersSchema