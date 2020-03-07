const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({ //using mongoose.schema here means that the model will use the default connection, as opposed to the connection specific to a particular mongo database
  // TODO: your schema here!
  /* repoID: Number
  ownerName: String,
  repoName: String,
  repoScore: Number,
  repoURL: String */
});

//db.fetcher.createIndex( {"repoID": 1}, {unique: true} )

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArray) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;