import React, { createContext, useContext, useState } from 'react'
import { ClosableOverlay, ErrorOverlay } from 'components/components-general/Overlay';

const overlayContext=createContext();
//a context provider to be able to show overlay anywhere at any time

const actions={
  addOverlay:'Add Item',
  removeItem:'Remove item',
}
const overlayTypes={
  errorOverlay:'Error Overlay',
  closableModal:'Closable Modal'
}

export default function OverlayProvider({children}) {
    const [overlayList,setOverlayList]=useState([]);

  function updateOverlayList({action,payload}){
    console.log('update overlay : ',action,payload);
    switch (action){
      case (actions.addOverlay): {
        setOverlayList((prevstate)=>[...prevstate,payload]);
        break;
      }
      case (actions.removeItem): {
        setOverlayList((prevstate)=>prevstate.filter((item)=>item.id!==payload.id));
        break;
      }
      default: return;
    }
  };
  function OverlayListComponent(){
    function OverlaySelector({item}){
      function closeOverlayFunction(){
        updateOverlayList({action:actions.removeItem,payload:{id:item.id}})}
      switch (item.type){
        case (overlayTypes.errorOverlay):{return <ErrorOverlay error={{message:item.message, status:item.status}} closeOverlay={closeOverlayFunction}/>}
        case (overlayTypes.closableModal):{return <ClosableOverlay title={item.title} closeFunc={closeOverlayFunction}>{item.children}</ClosableOverlay>}
        default: return null
      }
    }
    if (!overlayList) return null
    return <>{overlayList.map((item)=>(
      <OverlaySelector key={item.id} item={item}/>
    ))}</>
  }
  return (
    <overlayContext.Provider value={updateOverlayList}>
      {children}
      <OverlayListComponent overlayList={overlayList} updateOverlayList={updateOverlayList}/>
    </overlayContext.Provider>
  )
}



export function useShowOverlay(){
  const updateOverlayList=useContext(overlayContext);

  return {
    showErrorOverlay: function({id, message, status}){
      updateOverlayList({action:actions.addOverlay,payload:{
        type:overlayTypes.errorOverlay,
        id:id || message ||Date.now(),
        status,message
      }})
    },
    showClosableModal: function({id,title,children}){
      updateOverlayList({action:actions.addOverlay,payload:{
        type:overlayTypes.closableModal,
        id:id || title || Date.now(),
        title,children
      }})
    }
  }
}

export function useCloseOverlay(){
  const updateOverlayList=useContext(overlayContext);
  return function(id){
      updateOverlayList({action:actions.removeItem,payload:{id}})
  }
}