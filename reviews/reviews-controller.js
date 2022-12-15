import * as reviewsDao from './reviews-dao.js'

const ReviewsController = (app) => {
    app.post('/api/reviews', postReview);
    app.get('/api/books/:workID/reviews', getReviewsByWorkID);
}

const postReview = async (req, res) => {
    const review = req.body;
    const newReview = await reviewsDao.postReview(review);
    res.json(newReview); // TODO: what response is needed?
}

const getReviewsByWorkID = async (req, res) => {
    const workID = req.params.workID;
    console.log("Getting reviews by workIDs")
    console.log(workID)
    const reviews = await reviewsDao.findReviewsByWorkID(workID);
    res.json(reviews); // TODO: what response is needed?
}

export default ReviewsController;