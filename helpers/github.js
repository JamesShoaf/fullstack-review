const request = require('request');
const config = require('../config.js');

//basic version will simply return the first page of results without doing any concat
const getReposByUsername = (username, callback) => {
  let options = {
    url: '/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  // request.get('url', options, callback);
  request.get('https://api.github.com/', options, (err, response, data) => {
    if (err) { //log errors and pass them back to the callback function
      console.log(err);
      return callback(err, null);
    } //otherwise, pass the data back to the callback function (first 30 repos)
    callback(null, data);
  });
};

module.exports.getReposByUsername = getReposByUsername;

//todo: reimplement concat logic
// let getReposByUsername = (username, callback) => {
//   // TODO - Use the request module to request repos for a specific
//   // user from the github API

//   // The options object has been provided to help you out,
//   // but you'll have to fill in the URL
//   let options = {
//     url: '/users/' + username + '/repos?page=', //
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': `token ${config.TOKEN}`
//       'Accept': 'application/vnd.github.v3+json'
//     } //accept prop suggested by github api
//   };
//   var getHelper = (error, callback, options, pageNumber) => {
//     //initialize either an empty array, or use closure scope to grab the repos variable from the previous get call (since we'll be recursively calling this function)
//     var cumulativeRepos = repoArray || [];
//     //create a copy of the options object that we can add the pageNumber to
//     var currentPageOptions = object.create(options);
//     currentPageOptions.url += pageNumber;

//     //finally, do the get request
//     request.get('https://api.github.com/', currentPageOptions, (err, r, repoArray) => {
//       if (err) {
//         console.log(error);
//         callback(err, null);
//       }
//       //for requests returning a full page (30)
//       if (repoArray.length === 30) {
//         //concat the page to the last set of results
//         var repoArray = cumulativeRepos.concat(repoArray);
//         console.log(`There are at least ${repoArray.length} repos here!`)
//         //and call the recursive get function
//         getHelper(null, callback, options, pageNumber+1);
//       } else {
//         //for everything else, just pass the results to the callback function (probably res.send())
//         console.log(`There are ${repoArray.length} repos here!`)
//         callback(null, repoArray);
//       }
//     });
//   }
//   getHelper(null, callback, options, 1);
// }