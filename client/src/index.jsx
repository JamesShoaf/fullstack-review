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

  componentDidMount() {
    $.get('/repos', (response) => {
      this.setState({
        repos: response
      })
    })
  }

  search (term) {
    var self = this;
    var getCallback = (response) => { //creating the callbacks in this context will allow them to access the 'this'/self pointing to the App by closure scope
      // self.state.repos = response;
      self.setState({
        repos: response
      })
    };
    var postCallback = (response) => {
      console.log(response);
      $.get('/repos', getCallback);
    }
    $.post('/repos', {'username': term}, postCallback);

    //The below works and pulls repos from Github on search, but it doesn't update state
    // var self = this;
    // console.log(`Pulling repos from user ${term}`);
    // // TODO
    // $.post('/repos', {'username': term}, (response) => {
    //   console.log(response);
    //   var self = self;
    //   // $.get('/repos', (response) => {
    //   //   // self.state.repos = response //response should be the top 25
    //   // });
    // });
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