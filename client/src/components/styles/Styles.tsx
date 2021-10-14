import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  app: {
    height: '100vh',
    padding: '.5rem 0',
  },
  nav: {
    display: 'flex',
  },
  button: {
    border: '1px solid green',
    '&:hover': {
      backgroundColor: 'green',
    },
  },

  /**
   * Search
   */
  searchCard: {
    width: '100%',
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.1)',
  },
  searchMain: {
    // width: '100%',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: '.7rem',
    // position: 'relative',
  },

  searchInput: {
    width: '100%',
  },
  searchBox: {
    // position: 'relative',
  },
  searchButton: {},
  container: {
    padding: '0.3rem',
  },

  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  ul: {
    listStyleType: 'none',
  },
  li: {
    padding: '.5rem',
    cursor: 'pointer',
  },
});

export default useStyles;
