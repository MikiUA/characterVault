import React, { useEffect, useMemo, useState } from 'react'
import { EditableObjectProvider, useEditableObject } from '../../components-editableObject/editObjectContext'
import CharInfoBlock from './components-parts/_0E_CharInfoBlock';
import { dumpAllCharacterParamsIntoSimpleObject, getAdditionalCharParamsFromObject, getEssentialCharParamsFromObject, prepareSubmittableCharacterFromSimpleObject } from './viewCPFull_helpers';
import AdditionalParamsView from './components-parts/_1A_AdditionalParamsView';
import { requiredCharParams } from 'parameters-general/charParams/requiredCharParams';


export default function ViewCPFull({character,editMode,submitHandler}) {
  //CHARACTER PARAMS
  const extendedEditableObject=useMemo(()=>dumpAllCharacterParamsIntoSimpleObject(character),[character]);

  const [submitCharacterHandler,setSubmitCharacterHandler]=useState(null);
  function submitCharacter(updatedChar={}){
    const updatedCharacter=prepareSubmittableCharacterFromSimpleObject(updatedChar);
    submitHandler(updatedCharacter);
    setSubmitCharacterHandler(null);
  }
  useEffect(()=>{
    if (typeof(submitHandler)==='function') {
      setSubmitCharacterHandler(()=>submitCharacter);
    }
    //eslint-disable-next-line
  },[submitHandler])

  return (
    <EditableObjectProvider editMode={editMode} object={extendedEditableObject} availibleParams={requiredCharParams}>
      <ViewCPExtendedInner character={character} editMode={editMode} submitHandler={submitCharacterHandler}/>
    </EditableObjectProvider>
  )
}


function ViewCPExtendedInner({editMode,submitHandler}){
  const {editableObject,prepareSubmittable}=useEditableObject();  

  useEffect(()=>{
    if (typeof(submitHandler)==='function') {
      submitHandler(prepareSubmittable());
    }
    //eslint-disable-next-line
  },[submitHandler])

  return (
  <>          
    <CharInfoBlock char={getEssentialCharParamsFromObject(editableObject)} editMode={editMode}/>
    <AdditionalParamsView params={getAdditionalCharParamsFromObject(editableObject)} editMode={editMode}/>
    
  </>
  )
}
