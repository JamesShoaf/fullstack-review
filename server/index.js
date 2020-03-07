const express = require('express');
let app = express();
var github = require('../helpers/github.js'); //(username, callback) => {}
// console.log(github);
// import github from '../helpers/github.js';


app.use(express.static(__dirname + '/../client/dist'));

app.use('/repos', express.urlencoded({ 'extended': true })); //parses urlencoded data sent to the server.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  console.log(req.body);
  var repoArray = [];
  // and get the repo information from the github API, then
  github.getReposByUsername(req.body.username, (err, data) => {
    // console.log(data);
    // res.send(data);
    repoArray = JSON.parse(data);
    console.log(repoArray, repoArray.length);
    // save the repo information in the database

  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //read from database
  //return an array of 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});