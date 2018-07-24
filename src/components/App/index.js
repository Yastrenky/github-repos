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
      {list.items.map((item, index) => (
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
      data: null,
      urlrepo: []
    }
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
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
    const { classes } = this.props;
    const data = this.state.data;
    if (!data) return null;

    return (
      <div>
        <div className='header navbar navbar-default'>

          <h3><FontAwesomeIcon icon="laptop" />  Most Popular Android GitHub Repos</h3>

          <span className="search-box">
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              // onChange={this.handleChange('name')}
              margin="normal"
            />
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