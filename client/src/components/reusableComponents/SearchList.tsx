import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import a from '../../static/img/a.jpeg';
import b from '../../static/img/b.jpeg';

import c from '../../static/img/c.jpeg';

interface Props {}
const SearchList: React.FC<Props> = ({}) => {
  return (
    <List>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src={c} variant='square' />
        </ListItemAvatar>
        <ListItemText
          primary='Takeout?'
          secondary={
            <>
              {/* <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'></Typography> */}
              {'Burger, Pizza, Fried-Chicken ....'}
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Travis Howard' src={a} variant='square' />
        </ListItemAvatar>
        <ListItemText
          primary='Sultan Dine'
          secondary={<>{'Biryani, Pizza, Fried-Chicken ....'}</>}
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Cindy Baker' src={b} variant='square' />
        </ListItemAvatar>
        <ListItemText
          primary='Woodhouse Grill'
          secondary={<>{'T-bone Steak,Biryani'}</>}
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary='Biryani'
          secondary={<>{'Click here for more Results'}</>}
        />
      </ListItem>
    </List>
  );
};

export default SearchList;
