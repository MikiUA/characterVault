import React from 'react'
import { EditableObjectProvider, useEditableObject } from '../../components-editableObject/editObjectContext'
import styles from '../styles/CharacterViewer.module.css';
import AdditionalParamsView from './components-parts/_1A_AdditionalParamsView';

export default function ViewCPCompact({character,editMode}) {
  return (
    <EditableObjectProvider editMode={editMode} object={{...character["additional params"]}}>
      <ViewCPCompactInner character={character}/>
    </EditableObjectProvider>
  )
}

function ViewCPCompactInner({character}){
  //eslint-disable-next-line
  const {prepareSubmittable,editableObject}=useEditableObject();
  return (
    <>          
    <div className={styles['title-name']}>{character.fname?character.fname:character.shname}</div>
    <div className={styles['title-refname']}>{character.refname}</div>
    <div className={styles['title-refname']}>{character.description}</div>
    <AdditionalParamsView params={editableObject}/>
    </>
  )
}