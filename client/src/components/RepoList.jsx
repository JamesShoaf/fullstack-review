import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => {
  var repos = props.repos.map((repo, index) => {
    return <RepoEntry key={index} repo={repo}/>
  })
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {repos}
    </div>
  );
};

export default RepoList;