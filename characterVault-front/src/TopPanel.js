// import React from 'react';
// import ReactDOM from 'react-dom';
// import e from 'cors';
import {Route,Routes} from 'react-router-dom'

import { useState } from 'react';
import './TopPanel.css';
import {Link} from 'react-router-dom'
import TopPanelCollectionSelector from './pages/elements/TopPanelCollectionSelector';


function TopPanel() {
  
  const [openedMenu,setOpenedMenu]=useState("0");
  // function setOpenedMenu_f(menu){
  //   e.preventDefault();
  //   setOpenedMenu(menu);
  // }
  return (
    
    <div className="top-panel">
      <div className='top-panel-item'>
        <Routes>
          <Route path='/character/*' element={
            <button>edit/back?</button> 
          }/>
          <Route path='/' element={
            <button>show/hide UI</button> }/>
          <Route path='/collection/:collectionID' element={
            <>
              {/* <button>show/hide UI </button>  */}
              <TopPanelCollectionSelector/>
            </>}/>
          <Route path='/workflows/*' element={<button>do nothing</button> }/>
          <Route path='/user/*' element={<button>edit user</button> }/>
          <Route path='/contacts/*' element={<button>do nothing with contacts</button> }/>
        </Routes>
      </div>

        <Link to="/" className='top-panel-item site-title' onClick={()=>setOpenedMenu("0")} >Miki's Chargen</Link>

        {/* collection select */}

        
        {/* user menu */}
        <div className='dropdown-container user-icon-container top-panel-item'>
          <div onClick={()=>(openedMenu!=="user")?setOpenedMenu("user"):setOpenedMenu("")} className='dropdown-toggle'>
            {/* button, user menu icon */}
            <img className='user-icon' src='/user_template.jpg'/>
          </div>
          <div className={(openedMenu==="user")?'dropdown-menu':'hidden'}>
            <Link to="/user/userID" onClick={()=>setOpenedMenu("")} className='dropdown-menu_item'>my profile</Link>
            {/* <div className='dropdown-menu_item dropdown-container'> */}
              {/* <button className='dropdown-toggle'>author cabinet</button> */}
              <Link onClick={()=>setOpenedMenu("")} to="/collection/collectionIDuser" className='dropdown-menu_item'>my characters</Link>
              <Link onClick={()=>setOpenedMenu("")} to="/collections/userID" className='dropdown-menu_item'>my collections</Link>
              <Link onClick={()=>setOpenedMenu("")} to="/character/add" className='dropdown-menu_item'>add character</Link>
               <Link onClick={()=>setOpenedMenu("")} to="/collection/add" className='dropdown-menu_item'>add collection</Link>
            {/* </div> */}
          <Link to='/contacts' onClick={()=>setOpenedMenu("")} className='dropdown-menu_item'>customer support</Link>
          </div>
        </div>
        
        {/* <button onClick={event=>this.flowListShow(event)}>{this.state.current_flow_name}</button>
        <div className={(this.state.show_flows_button_state===true)?"show-flows-menu":"hidden"}>
          List of flows <button onClick={event=>this.flowListReload(event)}>reload</button>
          {this.state.flowListJsx}
        </div> */}
        {/* temporary login menu */}
        {/* <div className='dropdown-container'>
          <button onClick={()=>(openedMenu!=="login")?setOpenedMenu("login"):setOpenedMenu("")} className='dropdown-toggle'> Login (dev)</button>
          <div className={(openedMenu==="login")?'dropdown-menu':'hidden'}>
            <button className='dropdown-menu_item'>login Mikiua</button>
            <button className='dropdown-menu_item'>login Ana</button>
            <button className='dropdown-menu_item'>login MsUndead</button>
            <button onClick={()=>setOpenedMenu("")} className='dropdown-menu_item'>log out</button>
          </div>
        </div> */}
      </div>
    
  );
}

export default TopPanel;
