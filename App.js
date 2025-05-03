
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const fs = require('fs');


if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const app = express();
app.use(express.json());


const API_BASE = 'https://jsonplaceholder.typicode.com';


function validateResponse(response) {
  if (!response || !response.status || response.status < 200 || response.status >= 300) {
    throw new Error(`Invalid response status: ${response && response.status}`);
  }
  if (!response.data) {
    throw new Error('Response has no data');
  }
  return response.data;
}


app.get('/posts', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/posts`);
    const data = validateResponse(response);
    if (!Array.isArray(data)) throw new Error('Expected an array of posts');
    res.json(data);
  } catch (error) {
    logger.error(`GET /posts failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_BASE}/posts/${id}`);
    const data = validateResponse(response);
    if (typeof data !== 'object') throw new Error('Expected a post object');
    res.json(data);
  } catch (error) {
    logger.error(`GET /posts/${req.params.id} failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});


app.post('/posts', async (req, res) => {
  try {
    const payload = req.body;
    const response = await axios.post(`${API_BASE}/posts`, payload);
    const data = validateResponse(response);
    res.status(201).json(data);
  } catch (error) {
    logger.error(`POST /posts failed: ${error.message} Payload: ${JSON.stringify(req.body)}`);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// UPDATE an existing post
app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const response = await axios.put(`${API_BASE}/posts/${id}`, payload);
    const data = validateResponse(response);
    res.json(data);
  } catch (error) {
    logger.error(`PUT /posts/${req.params.id} failed: ${error.message} Payload: ${JSON.stringify(req.body)}`);
    res.status(500).json({ error: 'Failed to update post' });
  }
});


app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${API_BASE}/posts/${id}`);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    logger.error(`DELETE /posts/${req.params.id} failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
