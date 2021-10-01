import React, { useEffect, useState } from 'react';

const style = {
  width: '300px',
  height: '300px',
  marginBottom: '1rem',
  margin: '0 auto',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
      <div key={ind} className='result' style={style}>
        <p>Food: {el.name}</p>
        <p>Location: {el.location}</p>

        <p>Food</p>
        <ul>{renderFood(el.food[0].items)}</ul>
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
      setTimeout(async () => {
        const url = `http://localhost:9999/search?s=${search}`;
        const response = await fetch(url);
        const data = await response.json();
        const filterData = data.data.map((el: any) => el._source);
        setResult(filterData);
      }, 1000);
    };
    getData();
  }, [search]);
  return (
    <div className='App'>
      <input type='text' value={search} onChange={handleChange} />

      <div>
        <h2>Result</h2>
        {/* {renderResult(result)} */}
      </div>
    </div>
  );
};

export default App;
