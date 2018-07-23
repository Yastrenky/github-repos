import React, { Component } from 'react';
import url from '../../constants';
// import reposSaples from '../../constants/testobjet';
const imgGithub = 'https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png';


function GithubMap({ list }) {
  return (
    <div className='main-container highlight'>
      {list.items.map(item => (
        <span key={item.id} className='element'>
          <span><Card data={item} /></span>

        </span>
      ))}
    </div>
  )
}
function TechnicalInfo({ data }) {
  return (
    <div className='tec-info-parent'>
      <div style={{ backgroundColor: '#3f82bb', color: 'white', width: '100%', height: '30px', textAlign: 'center', borderRadius: 5 }}>INFO</div>
      <div className='tec-info glyphicon glyphicon-time'> {' CREATED'}: {data.created_at}</div>
      <div className='tec-info glyphicon glyphicon-star'> {' SCORE'}: {data.score}</div>
      <br />
      <div className='tec-info glyphicon glyphicon-floppy-disk'> {' SIZE'}: {data.size}</div>
      <br />
      <div className='tec-info glyphicon glyphicon-eye-open'> {' WATCHERS'}: {data.size}</div>
    </div>
  )
}
function ReposList({ data }) {
  return (

    <div className="container">
      <button type="button" className="btn btn-info glyphicon glyphicon-plus" data-toggle="collapse" data-target={'#demo' + data.id}> More</button>
      <div id={"demo" + data.id} className="collapse" style={{ width: '374px' }}>
        <div className="list-group" style={{ marginTop: 10 }}>
          <span ><TechnicalInfo data={data} /></span>
        </div>
      </div>
    </div>
  )
}
function Card({ data }) {
  return (
    <div className='card-container'>
      <span><img style={{ height: 180, margin: 10 }} src={data.owner.avatar_url} alt="" /></span>
      <span className="card-info">
        <h3>Name:<a href={data.owner.html_url}>{data.full_name}</a></h3>
        <div>Owner: {data.owner.login}</div>
        <div>Description: {data.description}</div>
        <div>Acces: {data.private ? 'Private' : 'Public'}</div>
        <div>Type: {data.owner.type}</div>
        <ReposList data={data} />
      </span>
    </div>
  )
}


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

    const data = this.state.data;

    if (!data) {
      return null
    }
    else{
      console.log(data.items[0])
    }


    return (
      <div>
        <div className='header navbar navbar-default'>
          <h3>Most Popular GitHub Repos</h3>
          <span className='img-git '>
            <img alt='' src={imgGithub} />
          </span>
        </div>
        <GithubMap list={data} />
      </div>
    )
  }

}
export default App;
