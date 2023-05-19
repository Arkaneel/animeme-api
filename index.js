

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/animemes', async (req, res) => {
  try {

    const response = await axios.get('https://www.reddit.com/r/Animemes.json');

    const posts = response.data.data.children.map((post) => ({
      title: post.data.title,
      url: post.data.url_overridden_by_dest,
      
    }));
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
