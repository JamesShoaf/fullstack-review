import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    var self = this;
    console.log(`${term} was searched`);
    // TODO
    $.post('/repos', {'username': term}, (response) => {
      console.log(response);
      var self = self;
      // $.get('/repos', (response) => {
      //   // self.state.repos = response //response should be the top 25
      // });
    });
  }

  // top25() { //update the top 25 repos on page load and after search response
  //   console.log('Fetching top 25 repos');
  //   $.get('/repos', (response) => {
  //     console.log(response);
  //   })
  // }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));