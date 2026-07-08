const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const posts = [];

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head><title>Cloud Links Community Forum</title>
<style>body{font-family:sans-serif;max-width:900px;margin:0 auto;padding:20px}
.post{border:1px solid #ddd;padding:15px;margin:10px 0;border-radius:5px}
</style>
</head>
<body>
<h1>Cloud Links Community Forum</h1>
<p>Discussions on cloud authority, SEO, and link building strategies.</p>
<div id="posts">
${posts.map(p => '<div class="post"><h3>'+p.title+'</h3><p>'+p.body+'</p><small>'+p.author+' - '+p.date+'</small></div>').join('')}
</div>
</body></html>`);
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
  res.json({success: true, post});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Cloud Links Forum running on port', PORT));
