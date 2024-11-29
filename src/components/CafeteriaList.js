import React from 'react';
import '../styles.css';
import ad1 from '../img/ad1.jpg';

const CafeteriaList = ({ cafeterias, onSelect }) => {
  return (
    <div className="cafeteria-list" style = {{padding : "20px"}}>
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