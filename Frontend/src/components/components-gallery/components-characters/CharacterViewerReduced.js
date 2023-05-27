import React, { useEffect, useMemo, useState } from 'react'
import { useDebounce, useLocalStorage } from 'functions-general/hooks';
import { filterObject_includesSting } from 'functions-general/filterObject';
import defaultStyles from "../styles/CharacterViewer.module.css"
import { useShowOverlay } from 'context-global/showOverlay';
import { useCharacter } from 'parameters-general/characterClass';

function checkCssModule(cssModule){
    return {
        'container':(cssModule && cssModule['container'])||defaultStyles['container'],
        'title-name':(cssModule && cssModule['title-name'])||defaultStyles['title-name'],
        'title-refname':(cssModule && cssModule['title-refname'])||defaultStyles['title-refname'],
        'parameter-container':(cssModule && cssModule['parameter-container'])||defaultStyles['parameter-container'],
        'parameter-item':(cssModule && cssModule['parameter-item'])||defaultStyles['parameter-item'],
        'item-label':(cssModule && cssModule['item-label'])||defaultStyles['item-label'],
        'item-value':(cssModule && cssModule['item-value'])||defaultStyles['item-value']
    }
}

export default function CharacterViewerLogic({character, cssModule}) {
  const styles=checkCssModule(cssModule);
  let initialCharParams=useMemo(() => initialShowableParams(character), [character]);
  const [filter,setFilter] = useLocalStorage('');
  const debouncedFilter=useDebounce(filter,500);
  const [visibleCharParams,setVisibleCharParams]= useState({});
  const {showErrorOverlay}=useShowOverlay();

  useEffect(()=>{
    setVisibleCharParams(filterObject_includesSting(initialCharParams,debouncedFilter))
  },[debouncedFilter,initialCharParams]);

  if (!character) {showErrorOverlay({message:'no character selected'}); return<></>;}

  return (
    <div className={styles['container']}>
      <div>
         <div className={styles['title-name']}>{character.fname?character.fname:character.shname}</div>
        <div className={styles['title-refname']}>{character.refname}</div>
        <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder='find parameterS'/>
        <OtherParams paramObj={visibleCharParams} styles={styles}/>
      </div>
      </div>
  )
}


function OtherParams({paramObj,styles}){
  return (
  <div className={styles['parameter-container']}>
    {Object.entries(paramObj).map(([label,value])=>{  
      if (typeof(value)!=='string') return ''
      return (
      <div key={label} className={styles['parameter-item']}>
        <div className={styles['item-label']}>
          {label}
        </div>
        <div className={styles['item-value']}>
          {value}
        </div>
      </div>)
    })}
  </div>
)}

function initialShowableParams(characterObj){
    let displayableObj=Object.assign({},characterObj['additional params']);
    displayableObj['Description']=characterObj.description;
    displayableObj['Date created']=new Date(characterObj.date_created).toDateString() ;
    displayableObj['Date modified']=new Date(characterObj.date_modified).toDateString();
  return displayableObj;

}