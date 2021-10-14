import React, { useEffect, useState } from 'react';
import useDebounce from '../custom-hooks/Debouncer';
import Styles from '../styles/Styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Button, Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { Tooltip } from '@mui/material';
import SearchList from '../reusableComponents/SearchList';
import ClearIcon from '@mui/icons-material/Clear';
const App: React.FC = () => {
  const classes = Styles();
  const [search, setSearchText] = useState('');
  const [result, setResult] = useState([]);
  const debounceValue = useDebounce(search, 500);
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const handleClear = (): void => {
    setSearchText('');
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
    <Grid container py={4} justifyContent='center'>
      <Grid item xs={12} sm={8} lg={8}>
        <div>
          {/* Input field */}
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            className={classes.searchCard}
            sx={{
              borderRadius: search ? '25px 25px 0 0' : '40px',
            }}
            item
            xs={12}>
            <Grid item xs={11} pl={4}>
              <TextField
                placeholder='Find your food at one place'
                value={search}
                onChange={handleChange}
                variant='standard'
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FastfoodIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      {search && (
                        <IconButton onClick={handleClear}>
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={1} pr={2}>
              <Tooltip title='Search options'>
                <IconButton
                  sx={{ width: '100%' }}
                  color='inherit'
                  aria-label='search options'>
                  <TuneIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          {/* Results */}
          <Grid item xs={12} pt={0.3}>
            {search && (
              <Paper
                sx={{
                  width: '100%',
                  height: '100%',
                  zIndex: '999',
                }}>
                <SearchList />
              </Paper>
            )}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
