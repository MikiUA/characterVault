import { ClosableOverlay } from "componentsGeneral/Overlay";
import { useState } from "react";

export function AddItemOverlay({close,handleSubmit}){
    const [newParamKey,setKey]=useState('');
    const pattern= new RegExp("^[A-Z0-9Є-Я][A-Za-z0-9Є-ї '-]{1,14}$");
    function doInput(newInput){
        // if (pattern.test(newInput))         
        setKey(newInput);
    }
    function onSubmit(){
        if (pattern.test(newParamKey)) handleSubmit(newParamKey);
        else return null
    }
    return(
        <ClosableOverlay closeFunc={close}>
            what param do you want to add:
            <input value={newParamKey} onChange={(e)=>doInput(e.target.value)} autoFocus required/>
            <button type='button' onClick={onSubmit}>Add</button>
        </ClosableOverlay>
    )
}