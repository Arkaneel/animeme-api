
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const colors = require("ansi-colors");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(cors());

const isImageUrl = (url) => {
  const imageFormats = [".jpg", ".jpeg", ".png", ".gif"];

  const lowerCaseUrl = url.toLowerCase();
  return imageFormats.some((format) => lowerCaseUrl.endsWith(format));
};

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "animeme-api.html");
  res.sendFile(filePath);
});

app.get("/animeme", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.reddit.com/r/Animemes/random/.json"
    );
    const data = response.data;

    if (
      data &&
      data[0] &&
      data[0].data &&
      data[0].data.children &&
      data[0].data.children.length > 0
    ) {
      const aniMeme = data[0].data.children[0].data;

      if (aniMeme.thumbnail && aniMeme.title && isImageUrl(aniMeme.url)) {
        const meme = {
          title: aniMeme.title,
          url: aniMeme.url,
        };
        res.json(meme);
      } else {
        res.status(500).json({
          error: "Failed to fetch meme",
        });
      }
    } else {
      res.status(500).json({
        error: "Failed to fetch meme",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch meme",
    });
  }
});

//Hentai
app.get("/henmeme", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.reddit.com/r/Hentaimemes/random/.json"
    );
    const data = response.data;

    if (
      data &&
      data[0] &&
      data[0].data &&
      data[0].data.children &&
      data[0].data.children.length > 0
    ) {
      const aniMeme = data[0].data.children[0].data;

      if (aniMeme.thumbnail && aniMeme.title && isImageUrl(aniMeme.url)) {
        const meme = {
          title: aniMeme.title,
          url: aniMeme.url,
        };
        res.json(meme);
      } else {
        res.status(500).json({
          error: "Failed to fetch meme",
        });
      }
    } else {
      res.status(500).json({
        error: "Failed to fetch meme",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch meme",
    });
  }
});

app.listen(PORT, () =>
  console.log(`\n> API is 🔥 at : ${colors.blue(`http://localhost:${PORT}`)}`)
);
