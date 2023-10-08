import React from 'react';

function Radioutton({title , value , status , setStatus , icon}) {
    return (
        <div className={value}>
            <label htmlFor={value}>
              {icon}
              {title}
            </label>
            <input
              type="radio"
              id={value}
              value={value}
              checked={status == value}
              onChange={e => setStatus(e.target.value)}
            />
          </div>
    );
}

export default Radioutton;