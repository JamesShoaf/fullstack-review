import React from 'react';

//anatomy of a repo
/*
Repo name - hyperlinked to repoURL           Reposcore bolded
Repo owner italicized

Onclick() display additional information - repo stars, repo forks, repo open issues in red, has wiki in green/red


*/

const RepoEntry = (props) => {
  return (
  <div>
      <span><a href={props.repo.repoURL}>{props.repo.repoName}</a></span>
        <span>{props.repo.repoScore}</span>
      <div>{props.repo.ownerName}</div>
  </div>
  )
}

export default RepoEntry;