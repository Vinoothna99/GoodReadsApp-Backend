import * as reviewsDao from './reviews-dao.js'

const ReviewsController = (app) => {
    app.post('/api/reviews', postReview);
    app.delete('/api/reviews/:reviewID', deleteReview);
    app.get('/api/books/:workID/reviews', getReviewsByWorkID);
    app.get('/api/reviews/:userID/reviews', getReviewsByUserID);
    app.get('/api/reviews', getReviews);
}

const postReview = async (req, res) => {
    const review = req.body;
    const reviewer = req.session['currentUser'];
    if (reviewer) {
        review.reviewer = reviewer._id;
        const newReview = await reviewsDao.postReview(review);
        res.json(newReview);
    }
    else {
        res.sendStatus(403); // Must be logged in to post reviews
    }
}

const getReviewsByWorkID = async (req, res) => {
    const workID = req.params.workID;
    const reviews = await reviewsDao.findReviewsByWorkID(workID);
    // console.log(reviews)
    res.json(reviews);
}

const getReviewsByUserID = async (req, res) => {
    const userID = req.params.userID;
    const reviews = await reviewsDao.findReviewsByUserID(userID);
    // console.log(reviews)
    res.json(reviews);
}

const deleteReview = async (req, res) => {
    const reviewID = req.params.reviewID;
    await reviewsDao.deleteReview(reviewID);
    res.json(reviewID);
    // res.json({reviewID});
}

const getReviews = async (req, res) => {
    const reviews = await reviewsDao.getReviews();
    res.json(reviews);
    // res.json({reviewID});
}

export default ReviewsController;