
const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware

router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const commentData = await Comment.create({
            body: req.body.content,
            userId: req.session.userId,
            postId: req.body.postId
        })
        res.status(200).json({message: "Comment created"});
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;

