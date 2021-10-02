import React, { useEffect, useState } from 'react';

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
  const [search, setText] = useState('');
  const [result, setResult] = useState([]);
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const renderFood = (foods: any): HTMLElement =>
    foods.map((food: any, ind: number) => <li key={ind}>{food}</li>);

  const renderResult = (r: object[]) => {
    const data = r.map((el: any, ind: number) => (
      <div key={ind} className='result' style={style.card}>
        <ul>
          <li>
            {el.name},{el.country}
          </li>
        </ul>
      </div>
    ));

    return data;
  };

  useEffect(() => {
    const getData = async () => {
      if (!search) {
        setResult([]);
        return;
      }
      const url = `http://localhost:9999/search?s=${search}`;
      const response = await fetch(url);
      const data = await response.json();
      const filterData = data.data.map((el: any) => el._source);
      setResult(filterData);
    };
    getData();
  }, [search]);
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
              {result.map((el: any) => (
                <li style={style.li}>
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
