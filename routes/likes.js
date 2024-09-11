const express = require('express');
const Post = require('../models/post');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes) post.likes = [];

    if (post.likes.includes(req.user.id)) return res.status(400).json({ message: 'Already liked this post' });

    post.likes.push(req.user.id);
    await post.save();

    res.json({ success: true, message: 'Post liked' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes) post.likes = [];

    post.likes = post.likes.filter((like) => like.toString() !== req.user.id);
    await post.save();

    res.json({ success: true, message: 'Post unliked' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
