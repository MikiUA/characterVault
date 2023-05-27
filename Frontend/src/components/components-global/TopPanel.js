import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useUser } from 'context-global/userContext';
import TestLoginBtns from 'components/components-general/TestLoginBtns';
import { ClosableOverlay } from 'components/components-general/Overlay';
import styles from './styles/TopPanel.module.css'
import { useChangeTheme } from 'context-global/themeProvider';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

// import TopPanelCollectionSelector from '../galleryPages/elements/TopPanelCollectionSelector'


export default function TopPanel() {
  // const [openedMenu,setOpenedMenu]=useState();
  
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography textAlign='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className={"styles['top-panel-item']+' '+styles['site-title']"}>Miki's Chargen</Link>
        </Typography>
        <UserMenu/>
        <SupportMenu/>
      </Toolbar>
    </AppBar>
  );
}  

function UserMenu({opium,copium}){
  const user = useUser();
  const [menuAnchor,setMenuAnchor]=useState(false);
  function handleClose(){
    setMenuAnchor(null)
  }
  if (!user) return(
    <Link to='/auth?action=signup'><Button color="inherit">Sign up</Button></Link>
  )
  const Links=(username)=>{return {
      'My Profile':`/user/${username}`,
      'My Characters':'/mycharacters',
      'My Collections':'/mycollections',
      'Add Character':'/character/new',
      'Add Collection':'/collection/new'
  }}
  return(
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event)=>{setMenuAnchor(event.currentTarget)}}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(menuAnchor)}
        onClose={handleClose}
      >
         {Object.entries(Links(user.userid)).map(([title,to])=>(
          <Link key={to} to={to} className={styles['dropdown-menu_item']}>
            <MenuItem onClick={handleClose}>{title}</MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  )
}

function SupportMenu(){
  const [menuAnchor,setMenuAnchor]=useState(false);  
  function handleClose(){setMenuAnchor(null)};
  
  const [enabledTLB,setEnabledTLB]=useState(false);
  const {setCurrentTheme,options:themeOptions}=useChangeTheme();
  const [enabledThemeOverlay,setEnabledThemeOverlay]=useState(false);
  
  return(
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={(event)=>{setMenuAnchor(event.currentTarget)}}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(menuAnchor)}
        onClose={handleClose}>
        <MenuItem onClick={()=>{setEnabledThemeOverlay(true);handleClose();}}>Change Theme</MenuItem>
        <MenuItem onClick={()=>{setEnabledTLB(true);handleClose()}}>Dev Change User</MenuItem>
        <MenuItem onClick={handleClose}><Link to='/contacts' className={styles['dropdown-menu_item']}>Contacts</Link></MenuItem>
      </Menu>
      <Overlays/>
    </>);

    function Overlays(){
      if (enabledTLB) return(
        <ClosableOverlay title='Test Login Buttons' closeFunc={()=>{setEnabledTLB(false)}}>
          <TestLoginBtns finishTest={()=>setEnabledTLB(false)}/>
        </ClosableOverlay>
      );
      if (enabledThemeOverlay) return (
        <ClosableOverlay title='Select Theme' closeFunc={()=>{setEnabledThemeOverlay(false)}}>
          {themeOptions.map((option)=>(
            <Button key={option} 
            onClick={()=>{
              setCurrentTheme(option)
              handleClose();
              // setEnabledThemeOverlay(false);
            }}>{option}</Button>
          ))}
        </ClosableOverlay>
      );
      return null;
    }
  }
  // return (
  //   <div className={styles['dropdown-container']+' '+ styles['top-panel-item']}
  //     onClick={()=>setIsActive(true)}
  //     onMouseLeave={()=>setIsActive(false)}
  //     >
  //     <button>...</button>
  //     <div className={(isActive)?styles['dropdown-menu']:'hidden'}>
  //         <p onClick={()=>setEnabledThemeOverlay(true)} className={styles['dropdown-menu_item']}>theme (WIP)</p>
  //         <p onClick={()=>setEnabledTLB(true)} className={styles['dropdown-menu_item']}>TestLoginBtns</p>
  //         <Link to='/contacts' className={styles['dropdown-menu_item']}>Contacts</Link>
  //     </div>
  //     </div>
//   )
// }