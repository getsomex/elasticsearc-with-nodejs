import React from 'react';
import Styles from '../styles/Styles';
import { Card, TextField } from '@mui/material';
const Search = () => {
  const classes = Styles();
  return (
    <div className='container'>
      <div className='input'>
        <TextField />
      </div>
    </div>
  );
};

export default Search;
{
  /* <div className='container' style={style.container}>
        <div className='flex-box' style={style.flexBox as React.CSSProperties}>
          <input
            style={style.input}
            type='text'
            value={search}
            onChange={handleChange}
          />
          <div className='result' style={style.card}>
            <ul style={style.ul}>
              {result.map((el: any) => (
                <li style={style.li}>
                  {el.name},{el.country}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */
}
