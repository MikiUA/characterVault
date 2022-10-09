import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import './index.css';
import TopPanel from './TopPanel';

import CharacterPage from './pages/CharacterPage';
import GalleryPage from './pages/GalleryPage';
import UserPage from './pages/UserPage';
import ContactsPage from './pages/ContactsPage';
import CollectionsPage from './pages/CollectionsPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <React.StrictMode>
  <div className='body'>
      <TopPanel/>
      <div className="main-page">
        <Routes>
          <Route path='/' element={<GalleryPage/>}/>
          <Route path='/character/*' element={<CharacterPage/>}/>
          <Route path='/collection/:collectionID' element={<GalleryPage/>}/>
          <Route path='/collections/*' element={<CollectionsPage/>}/>
          <Route path='/user/*' element={<UserPage/>}/>
          <Route path='/contacts/*' element={<ContactsPage/>}/>
        </Routes>
      </div>
    </div>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
