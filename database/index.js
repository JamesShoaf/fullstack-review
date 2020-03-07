const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({ //using mongoose.schema here means that the model will use the default connection, as opposed to the connection specific to a particular mongo database
  // TODO: your schema here!
  repoID: {
    type: Number,
    unique: true
  }
  ownerName: String,
  repoName: String,
  repoURL: String,
  repoScore: Number,
  repoStars: Number,
  repoForks: Number,
  repoOpenIssues: Number,
  repoHasWiki: Boolean
});

//db.fetcher.createIndex( {"repoID": 1}, {unique: true} )

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArray, callback) => {
  const repoScore = (repoObj) => {
    var stars = repoObj.stargazers_count +1; //adding 1 makes using the log function in the next step more convenient
    var forks = repoObj.forks_count +1;
    var hasWiki = repoObj.has_wiki;
    var openIssues = repoObj.open_issues_count;
    var score = 0;
    score -= openIssues;
    if(hasWiki) {
      score += 10;
    }
    score += 10 * Math.log(forks);
    score += 10 * Math.log(stars);
    return score;
  }
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var documentArray = [];
  for (let i = 0; i < repoArray.length; i++) {
    var currentRepo = repoArray[i];
    var currentRepoScore = repoScore(currentRepo);
    // var silence = new Kitten({ name: 'Silence' });
    var repoDocument = new Repo({
      repoID: currentRepo.id,
      ownerName: currentRepo.owner.login,
      repoName: currentRepo.name,
      repoURL: currentRepo.html_url,
      repoScore: currentRepoScore,
      repoStars: currentRepo.stargazers_count,
      repoForks: currentRepo.forks_count,
      repoOpenIssues: currentRepo.open_issues_count,
      repoHasWiki: currentRepo.has_wiki
    });
    documentArray.push(repoDocument);
  }
}

module.exports.save = save;