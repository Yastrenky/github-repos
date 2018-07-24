import React, { Component } from 'react';
import url from '../../constants';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../Card';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

library.add(faLaptop);
// import reposSaples from '../../constants/testobjet';
const imgGithub = 'https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png';

function GithubMap({ list }) {
  return (
    <div className='main-container highlight'>
      {list.map((item, index) => (
        <span key={item.id} className='element'>
          <span><Card data={item} index={index + 1} /></span>

        </span>
      ))}
    </div>
  )
}

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      searchedData: [],
      data: null,
      urlrepo: []
    }
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e) {


    var value = e.target.value;

    if (value.length > 0) {
      this.setState({
        search: value,
        searchedData: this.searchEngine(this.state.data, value)
      })
    }
    else {
      this.setState({ search: value, searchedData: [] })
    }


  }

  searchEngine(arr, value) {
    var items = [];
    arr.items.forEach(item => {
      // console.log(item.name);
      if (item.full_name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value)) {
        items.push(item)
      }
    })
    // console.log(items.length)
    return items
  }

  fetchSearchTopStories(searchTerm) {
    fetch(searchTerm, {
      method: "get",
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => this.setState({ data: data })
      )
      .catch(e => e);
  }

  componentDidMount() {
    this.fetchSearchTopStories(url);
  }

  render() {
    //to delete after testing
    // console.log(this.state);

    const { classes } = this.props;
    var data = this.state.data;

    if (data) {
      data = this.state.searchedData.length > 0 ? this.state.searchedData : this.state.data.items;
    }
    else {
      return null;
    }
    return (
      <div>
        <div className='header navbar navbar-default'>
          <h3><FontAwesomeIcon icon="laptop" />  Most Popular Android GitHub Repos</h3>
          <span className="search-box">
            <TextField
              fullWidth={true}
              id="name"
              label="Search"
              heigth="1px"
              className={classes.textField}
              value={this.state.search}
              onChange={this.onSearch}
              margin="normal"
              style={{ color: "white" }}
            />
            <div>Results: {data.length}</div>
          </span>
          <span className='img-git '>
            <img alt='' src={imgGithub} />
          </span>

        </div>
        <GithubMap list={data} />

      </div>
    )
  }

}
export default withRoot(withStyles(styles)(App));