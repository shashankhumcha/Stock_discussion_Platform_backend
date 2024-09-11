const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/:postId/comments', auth, async (req, res) => {
  const { comment } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = new Comment({ user: req.user.id, post: req.params.postId, comment });
    await newComment.save();

    res.json({ success: true, commentId: newComment._id, message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:postId/comments/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    await comment.remove();
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
