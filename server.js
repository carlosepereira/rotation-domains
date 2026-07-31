const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/upload-txt', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'A .txt file is required in the file field.' });
  }

  const isTxtMime = req.file.mimetype === 'text/plain';
  const isTxtName = typeof req.file.originalname === 'string' && req.file.originalname.toLowerCase().endsWith('.txt');

  if (!isTxtMime && !isTxtName) {
    return res.status(400).json({ error: 'Only .txt files are supported.' });
  }

  const content = req.file.buffer.toString('utf8');
  const urls = content
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);

  return res.json({ urls, count: urls.length });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
