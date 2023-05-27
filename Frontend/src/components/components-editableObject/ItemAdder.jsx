import React, { useState } from 'react'
import { ClosableOverlay } from 'components/components-general/Overlay';
import { useEditableObjectItemAdder } from './editObjectContext';

export function AddItemOverlay({close,handleSubmit}){
    const [newParamKey,setKey]=useState('');
    const pattern= new RegExp("^[A-Z0-9Є-Я][A-Za-z0-9Є-ї '-]{1,14}$");
    function doInput(newInput){
        // if (pattern.test(newInput))         
        setKey(newInput);
    }
    function onSubmit(){
        // if (pattern.test(newParamKey)) 
        handleSubmit(newParamKey);
        // else return null
    }
    return(
        <ClosableOverlay closeFunc={close}>
            what param do you want to add:
            <input value={newParamKey} onChange={(e)=>doInput(e.target.value)} autoFocus required/>
            <button type='button' onClick={onSubmit}>Add</button>
        </ClosableOverlay>
    )
}

export default function ItemAdder() {
    const [isAddingItem,setIsAddingItem]= useState(false);
    const {addItem}=useEditableObjectItemAdder();

    function addItemHandler(newItem){
        addItem(newItem);
        setIsAddingItem(false);
    }

  return (
    <div>
        <button type='button' onClick={()=>setIsAddingItem(true)}>+</button>
        {isAddingItem?<AddItemOverlay close={()=>setIsAddingItem(false)} handleSubmit={addItemHandler}/>:''}
    </div>
  )
}
