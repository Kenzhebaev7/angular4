const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// {
//   "name": "Guy Ritche",
//   "birthDate": "1978-09-09"
// }
router.post('/authors', async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Author create error' });
  }
});

router.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Author fetch error' });
  }
});

router.get('/authors/:id', async (req, res) => {
  const authorId = req.params.id;
  try {
    const author = await Author.findById(authorId);
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json(author);
    }
  } catch (error) {
    res.status(500).json({ error: 'Author fetch error' });
  }
});

router.put('/authors/:id', async (req, res) => {
  const authorId = req.params.id;
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(authorId, req.body, { new: true });
    if (!updatedAuthor) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json(updatedAuthor);
    }
  } catch (error) {
    res.status(500).json({ error: 'Author update error' });
  }
});

router.delete('/authors/:id', async (req, res) => {
  const authorId = req.params.id;
  try {
    const deletedAuthor = await Author.findByIdAndRemove(authorId);
    if (!deletedAuthor) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json({ message: 'Author deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Author delete error' });
  }
});

module.exports = router;
