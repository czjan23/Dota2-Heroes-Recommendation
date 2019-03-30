const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const heroes = require('./heroes');
const fetch = require('node-fetch');

app.use(cors());

app.get('/heroes', (req, res) => {
    res.send({heroes: heroes});
});

app.get('/results', (req, res) => {
  console.log(req.query);

  let url = 'http://localhost:5000/recommendations';
  fetch(url, {
          method: 'post',
          body:    JSON.stringify(req.query),
          headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(json => res.send(json));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
