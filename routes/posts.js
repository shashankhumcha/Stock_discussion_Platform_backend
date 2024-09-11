const express = require('express');
const Post = require('../models/post');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;
  try {
    const post = new Post({ stockSymbol, title, description, tags, user: req.user.id });
    await post.save();
    res.json({ success: true, postId: post._id, message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  const { stockSymbol, tags, sortBy } = req.query;
  let filter = {};
  if (stockSymbol) filter.stockSymbol = stockSymbol;
  if (tags) filter.tags = { $in: tags.split(',') };

  let sort = { createdAt: -1 };
  if (sortBy === 'likes') sort = { likes: -1 };

  try {
    const posts = await Post.find(filter).sort(sort).populate('user', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', 'username')
      .populate({ path: 'comments', populate: { path: 'user', select: 'username' } });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    await post.remove();
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
