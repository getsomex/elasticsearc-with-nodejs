import React, { useEffect, useState } from 'react';
import useDebounce from './components/debouncer/Debouncer';
const style = {
  app: {
    width: '100%',
    heght: '100%',
  },
  container: {
    padding: '1rem',
  },
  card: {
    width: '20vw',
    height: '100%',
    padding: '0 1rem',

    marginBottom: '1rem',
    margin: '0 auto',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  input: {
    padding: '.5rem 1rem',
    marginBottom: '.4rem',
    width: '20vw',
  },
  ul: {
    listStyleType: 'none',
  },
  li: {
    padding: '.5rem',
    cursor: 'pointer',
  },
};

const App: React.FC = () => {
  const [search, setSearchText] = useState('');
  const [result, setResult] = useState([]);
  const debounceValue = useDebounce(search, 500);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      if (!debounceValue) {
        return setResult([]);
      }
      if (debounceValue) {
        const url = `http://localhost:9999/restaurants/search?s=${debounceValue}`;
        const response = await fetch(url);
        const data = await response.json();
        const filterData = data.data.map((el: any) => el._source);
        setResult(filterData);
      }
    };
    getData();
  }, [debounceValue]);
  return (
    <div className='App' style={style.app}>
      <div className='container' style={style.container}>
        <div className='flex-box' style={style.flexBox as React.CSSProperties}>
          <input
            style={style.input}
            type='text'
            value={search}
            onChange={handleChange}
          />
          <div className='result' style={style.card}>
            <ul style={style.ul}>
              {result.map((el: any, ind: number) => (
                <li key={ind} style={style.li}>
                  {el.name},{el.country}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
