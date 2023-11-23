import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

const createComment = async (req, res, next) => {
    try {
        const { desc, slug, parent, replyOnUser } = req.body;

        const post = await PostModel.findOne({ slug: slug});

        if(!post) {
            const error = new Error('Post not found');
            return next(error);
        }

        const newComment = new CommentModel({
            user: req.user._id,
            desc: desc,
            post: post._id,
            parent: parent,
            replyOnUser: replyOnUser,
        })

        const savedComment = await newComment.save();
        return res.json(savedComment);

    } catch (error) {
        next(error)
    }
};

const updateComment = async (req, res, next) => {
    try {
        const { desc } = req.body;

        const comment = await CommentModel.findById(req.params.commentId );

        if(!comment) {
            const error = new Error('Comment not found');
            return next(error);
        }
        comment.desc = desc || comment.desc;

        const updatedComment = await comment.save();
        return res.json(updatedComment);

    } catch (error) {
        next(error)
    }
};

export { createComment, updateComment };
