import React from 'react';
import '../styles.css';
import ad1 from '../img/ad1.jpg';

const CafeteriaList = ({ cafeterias, onSelect }) => {
  return (
    <div className="cafeteria-list">
      <h2>Welcome Back!</h2>
      <p style = {{color: "black"}}>Start shopping for unbeatable deals on food you love. </p>
      <div className = "ads">
        <img src = {ad1} />
        <img src = {ad1} />
        <img src = {ad1} />
      </div>
      <h3>Start ordering now!</h3>
      <div className="cafeteria-option">
        {cafeterias.map(cafeteria => (
          <div key={cafeteria.id} className="cafeteria-item" onClick={() => onSelect(cafeteria.id)}>
            <div className = "cafeteria-name" >{cafeteria.name}</div>
            <img src={cafeteria.image} alt={cafeteria.name} className='CafeteriaImg' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CafeteriaList;