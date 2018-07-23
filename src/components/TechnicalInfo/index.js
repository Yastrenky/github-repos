import React from 'react';
import format from '../../assets/format';

const TechnicalInfo = ({ data }) =>{
  return (
    <div className='tec-info-parent'>
      <div style={{ backgroundColor: 'rgb(94, 161, 75)', color: 'white', width: '100%', height: '30px', textAlign: 'center', borderRadius: 5 }}>INFO</div>
      <div className='tec-info glyphicon glyphicon-time'> {' CREATED'}: {format.time(data.created_at).date}</div>
      <div className='tec-info glyphicon glyphicon-star'> {' SCORE'}: {data.score}</div>
      <br />
      <div className='tec-info glyphicon glyphicon-floppy-disk'> {' SIZE'}: {data.size}</div>
      <br />
      <div className='tec-info glyphicon glyphicon-eye-open'> {' WATCHERS'}: {data.size}</div>
    </div>
  )
}

export default TechnicalInfo;