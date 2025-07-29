const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/fetch", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    res.set("Content-Type", "text/html");
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Failed to fetch content");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});