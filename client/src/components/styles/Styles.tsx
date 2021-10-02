import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
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
});

export default useStyles;
