import React, { Component } from 'react';
import url from '../../constants';
const imgGithub = 'https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png';


function GithubMap({list}){
  return(
    <div className='container'>
    {list.items.map(item=>(
      <div key={item.id} className='element'>

       <span className='info'>
         <span ><img  alt='' style={{height:80}} src={item.owner.avatar_url}/></span>
         <span>
          <div>Repositorie Name:<a href={item.owner.html_url}>{item.full_name}</a></div>
          <div>Id: {item.id}</div>
          <div>Acces: {item.private?'Private':'Public'}</div>
          <div>Type: {item.owner.type}</div>
         </span>
       </span>
       <span style={{width: '185px', height: '168px'}}>
        <div className='tec-info glyphicon glyphicon-star'> SCORE: {item.score}</div>
        <br/>
        <div  className='tec-info glyphicon glyphicon-floppy-disk'> SIZE: {item.size}</div>
       </span>
      </div>
      ))}
  </div>
)

}


class App extends Component{
 constructor(props){
   super(props);

   this.state = {
     data: null
   }
 }

componentDidMount(){
  fetch(url , {
    method: "get",
    mode: "cors"
  })
   .then(response => response.json())
   .then( data => this.setState({data: data}))
   .catch(e => e);
}

 render(){

   const data = this.state.data;
   if(!data){
     return null
   }
  return (
    <div>
     <div className='header navbar navbar-default'>
      <h3>The Best Repositories</h3>
      <span className='img-git '>
         <img alt='' src={imgGithub}/>
      </span>
     </div>
     <GithubMap list={data}/>
    </div>
  )
 }

}
export default App;
