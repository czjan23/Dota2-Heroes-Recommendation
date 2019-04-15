const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const hero = require('./heroes');
const fetch = require('node-fetch');

app.use(cors());

app.get('/heroes', (req, res) => {
    res.send({heroes: hero.heroes});
});

app.get('/results', (req, response) => {
  let vec = [
    hero.idLookUpTab1[Number(req.query.team0)],
    hero.idLookUpTab1[Number(req.query.team1)],
    hero.idLookUpTab1[Number(req.query.team2)],
    hero.idLookUpTab1[Number(req.query.team3)],
    hero.idLookUpTab1[Number(req.query.oppo0)],
    hero.idLookUpTab1[Number(req.query.oppo1)],
    hero.idLookUpTab1[Number(req.query.oppo2)],
    hero.idLookUpTab1[Number(req.query.oppo3)],
    hero.idLookUpTab1[Number(req.query.oppo4)],
  ];
  let model = req.query.model;
  let body = {
    vec: vec,
    model: model
  };
  let url = 'http://localhost:5000/recommendations';
  fetch(url, {
          method: 'post',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(res => {
          res.forEach((val, index) => {
            res[index] = hero.idLookUpTab2[val]
          });
          response.send(res);
      })
      .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))
