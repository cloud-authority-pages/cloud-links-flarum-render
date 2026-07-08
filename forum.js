const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = [];

app.get('/', (req, res) => {
  const postHtml = posts.map(p =>
    '<div style="border:1px solid #ddd;padding:15px;margin:10px 0;border-radius:5px">' +
    '<h3>' + p.title + '</h3><p>' + p.body + '</p>' +
    '<small><strong>' + p.author + '</strong> &mdash; ' + new Date(p.date).toLocaleDateString() + '</small></div>'
  ).join('') || '<p>No discussions yet. Be the first to post!</p>';

  res.send('<!DOCTYPE html><html><head><title>Cloud Links Community Forum</title>' +
    '<style>body{font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px}' +
    'h1{color:#7c3aed}form{background:#f9f9f9;padding:20px;border-radius:8px;margin-bottom:20px}' +
    'input,textarea{width:100%;padding:8px;margin:5px 0;box-sizing:border-box}' +
    'button{background:#7c3aed;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer}' +
    '</style></head>' +
    '<body><h1>Cloud Links Community Forum</h1>' +
    '<p>Discussions on cloud authority, SEO, and link building strategies.</p>' +
    '<form method="post" action="/post">' +
    '<input name="title" placeholder="Discussion title" required>' +
    '<textarea name="body" rows="3" placeholder="Your message"></textarea>' +
    '<input name="author" placeholder="Your name">' +
    '<button type="submit">Post Discussion</button></form>' +
    postHtml + '</body></html>');
});

app.post('/post', (req, res) => {
  posts.unshift({
    title: req.body.title || 'Untitled',
    body: req.body.body || '',
    author: req.body.author || 'Anonymous',
    date: new Date().toISOString()
  });
  res.redirect('/');
});

app.get('/api/posts', (req, res) => res.json(posts));
app.post('/api/posts', (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title || 'Untitled',
    body: req.body.body || '',
    author: req.body.author || 'Anonymous',
    date: new Date().toISOString()
  };
  posts.unshift(post);
  res.json({ success: true, post });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('Cloud Links Forum running on port', PORT));
