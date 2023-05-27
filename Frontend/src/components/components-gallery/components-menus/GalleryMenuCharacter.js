import React, {useState } from 'react'
import { Link} from 'react-router-dom';
import {useUserID } from "context-global/userContext"
import styles from "../styles/GalleryCharacterMenu.module.css"
// import CharacterViewerLogic from '../components-characters/CharacterViewer'
import { useShowOverlay } from 'context-global/showOverlay';
import SelectCollectionToAddChar from '../components-collections/SelectCollectionToAddChar';
import ViewCPCompact from '../components-character-params/ViewCPCompact';

export default function GalleryCharacterMenu({character, isEditable=false,closeMenuF=function(){}}) {

  const user=useUserID();
  const [editMode,setEditMode]=useState(false); function toggleEditMode(){setEditMode(!editMode)}

  const {showClosableModal}=useShowOverlay();
  function selectCollectionToAddChar(){
    showClosableModal({children:<SelectCollectionToAddChar charId={character._id} charName={character.shname}/>})
  }

  if (!character) { return<>'no character selected'</>}
  if (!isEditable && user && character.host===user) isEditable=true;

  return (
    <div className={styles['container']}>
      <button><Link to={`/character/${character._id}`}>Full</Link></button>
      {editMode?<button>Submit</button>:""}
      {isEditable?<button onClick={()=>toggleEditMode()}>{editMode?"Cancel":"Edit"}</button>:''}
      <button onClick={selectCollectionToAddChar}>Add to collection</button>
      <button onClick={closeMenuF}>Close</button>

      <ViewCPCompact {...{character,editMode}}/>
    </div>
  )
}