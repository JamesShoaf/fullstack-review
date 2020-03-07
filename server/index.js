const express = require('express');
let app = express();
var github = require('../helpers/github.js'); //(username, callback) => {}
// console.log(github);
// import github from '../helpers/github.js';
const db = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));

app.use('/repos', express.urlencoded({ 'extended': true })); //parses urlencoded data sent to the server.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  var repoArray = [];
  // and get the repo information from the github API, then
  github.getReposByUsername(req.body.username, (err, data) => {
    repoArray = JSON.parse(data);
    // save the repo information in the database
    db.save(repoArray)
    .then(results => res.send(`${req.body.username} has been added to the database`))
    .catch(error => res.send(`${req.body.username}'s record has been updated!`))
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.query25((err, top25) => {
    if (err) {
      res.send(err);
    }
    res.send(top25);
  })
  //read from database
  //return an array of 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});