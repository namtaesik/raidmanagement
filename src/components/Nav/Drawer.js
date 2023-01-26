import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import {  SET_SELECTOR } from "../../constants/action-types";
import {store} from '../../store/index'

export default function TemporaryDrawer() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  function PageMove(item,index,e){
    pageList.selector = index;
    store.dispatch({
      type:'SET_SELECTOR',
      payload: pageList
    });
     navigate(item.path);
  }
  // Drawer에 그려줄 리스트 목록을 Path와 Name으로 구분.
  const pageList = store.getState().navMenu;
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
          onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {pageList.menu.map((item, index) => (
          <ListItem key={item.path} disablePadding
          onClick={(e) =>{PageMove(item,index,e)}}>
            <ListItemButton >
              <ListItemIcon>
               <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          ><MenuIcon >{'left'}</MenuIcon></IconButton>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}