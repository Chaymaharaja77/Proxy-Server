require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get('/fetch', async (req, res) => {
  if (req.query.key !== API_KEY) {
    return res.status(403).send('Forbidden');
  }
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing URL');
  try {
    const r = await axios.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    res.set('Content-Type', 'text/html');
    res.send(r.data);
  } catch (err) {
    res.status(500).send('Fetch error');
  }
});

app.listen(PORT, () => console.log(`Proxy live on port ${PORT}`));
