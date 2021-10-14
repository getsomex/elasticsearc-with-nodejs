import React from 'react';
import Header from './header/Header';
import Styles from './styles/Styles';
import Search from './search/Search';
const App: React.FC = () => {
  const classes = Styles();
  return (
    <div className={classes.app}>
      <Header />
      <Search />
    </div>
  );
};

export default App;
