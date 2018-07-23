import React, { Component } from 'react';
import url from '../../constants';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faLaptop);
// import reposSaples from '../../constants/testobjet';
const imgGithub = 'https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png';

function format_date(dat) {
  var date = new Date(dat)
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();

  let h = date.getHours();

  let hf = (h > 11) ? 'PM' : 'AM';
  let hh = (h > 12) ? h % 12 : h;
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if (d < 10) d = '0' + d;
  if (m < 10) m = '0' + m;
  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;
  if (ss < 10) ss = '0' + ss;

  return { date: m + '/' + d + '/' + y,
           time: hh + ':' + mm + ':' + ss + ' ' + hf };
}

function GithubMap({ list }) {
  return (
    <div className='main-container highlight'>
      {list.items.map( (item, index) => (
        <span key={item.id} className='element'>
          <span><Card data={item} index={index+1} /></span>

        </span>
      ))}
    </div>
  )
}
function TechnicalInfo({ data }) {
  return (
    <div className='tec-info-parent'>
      <div style={{ backgroundColor: 'rgb(94, 161, 75)', color: 'white', width: '100%', height: '30px', textAlign: 'center', borderRadius: 5 }}>INFO</div>
      <div className='tec-info glyphicon glyphicon-time'> {' CREATED'}: {format_date(data.created_at).date}</div>
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
function Card({ data , index}) {
  return (
    <div className='card-container'>
      <span className="card-index">#{index}</span>
      <span><img style={{ height: 180, margin: 10 }} src={data.owner.avatar_url} alt="" /></span>
      <span className="card-info">
        <h3>Name: <a href={data.owner.html_url}>{data.full_name}</a></h3>
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
    else {
      // console.log(data.items[0])
    }


    return (
      <div>
        <div className='header navbar navbar-default'>
          <h3><FontAwesomeIcon icon="laptop"/>  Most Popular Android GitHub Repos</h3>
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
