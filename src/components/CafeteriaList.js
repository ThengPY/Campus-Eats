import React from 'react';
import '../styles.css';

const CafeteriaList = ({ cafeterias, onSelect }) => {
  return (
    <div className="cafeteria-list">
      {/* <h1>Campus Eats</h1> */}
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