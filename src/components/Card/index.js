import React from 'react';
import ReposList from "../ReposList";


const Card = ({ data, index }) => {
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
        <div>Language: {data.language}</div>
        <ReposList data={data} />
      </span>
    </div>
  )
}

export default Card;