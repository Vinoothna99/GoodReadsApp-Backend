import express from 'express';
import cors from "cors";
import session from "express-session"
import UsersController from "./users/users-controller.js";
import ReviewsController from "./reviews/reviews-controller.js";
import mongoose from "mongoose";
import PostsController from "./posts/posts-controller.js";
import FollowsController from "./follows/follows-controller.js";
const CONNECTION_STRING = 'mongodb://localhost:27017/cs5610'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
} // TODO: options from lecture video, is this needed?

mongoose.connect(CONNECTION_STRING, options);
const app = express();
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(session({
    secret: 'Secret for signing cookie',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.json());
UsersController(app);
ReviewsController(app);
PostsController(app);
FollowsController(app);
app.listen(process.env.PORT || 4000);