import React from 'react'
import ValueEditable from 'components/components-editableObject/ValueEditable';
import ItemCard from 'components/components-gallery/components-other/ItemCard';

import { Box } from '@mui/material';


export default function CharInfoBlock({char,editMode}) {
  return (
    <Box 
      display='flex'
      margin='1em'
      border='1px solid black'
      borderColor='primary.main'
      sx={{
        backgroundColor:'background.paper'
    }}>
      <ItemCard imageUrl={char.img_url[1]} title={char.shname[1]} coloring={{backgroundColor:char.main_color[1]}}/>
      <Box padding='1em' width={0} flexGrow={1}>
        <Box component='h2'>
          <ValueEditable label='fname' value={char.fname}  pattern="^[A-Z0-9Є-Я][A-Za-z0-9Є-ї '.-]{0,34}$"/>
          {editMode?<br/>:null}
          {(!char.fname[1] || editMode)?
            <ValueEditable label='shname' value={char.shname}  pattern="^([A-Z0-9Є-Я][A-Za-z0-9Є-ї '-]{1,14})$"/> 
            :null}
        </Box>
        <div>
          View Access: <ValueEditable label='view_access' value={char['view_access']} inputType='radio' availibleOptions={['private','public']} required/>
        </div>
        <div>
            Is dnd:
            <ValueEditable inputType='checkbox' label='is_DnD' value={char.is_DnD} required disabled={char['is_DnD']===true}/>
            {/* <span style={{margin:'0'}}>Note: you can not revert your character back from being a DnD once you submit changes</span> */}
        </div>
        {editMode?<>
          <div>Reference name: <ValueEditable label='refname' value={char.refname} pattern="^[A-Za-z0-9Є-ї '-]{0,15}$" required/></div>
          <div> Image url: <ValueEditable label='img_url' value={char.img_url}/> </div>
          <div>
            Main Color: <ValueEditable label='main_color' value={char.main_color}/>
          </div>
        </>:null}
        <div>Description : <ValueEditable label='description' value={char.description}  pattern="^[A-ZЄ-Я][A-Za-z0-9Є-ї '.()-]{1,50}$" required/></div>
        
      </Box>
    </Box>
  )
}