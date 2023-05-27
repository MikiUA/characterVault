import { param } from "./suggestedParamClass";

const { useState, useEffect, useRef, useCallback } = require("react");

const emptyItemValue="";
function initialiseNewObject(oldObject,editMode){
    const itemType=editMode?0:(-1);
    const newObject={};
    for (const key in oldObject){
        let newValue=oldObject[key]
        if(newValue===false) newValue="false"
        if (newValue===null || newValue===undefined) newValue=emptyItemValue;
        newObject[key]=[itemType,newValue];
    }
    return newObject
}

function prepareSubmittableFromEditable(editableObject){
    const newObject={};
    for (const key in editableObject){
        if (editableObject[key][1]) newObject[key]=editableObject[key][1];
    }
    return newObject
}


export default function useEditableObject(oldObject,editMode=true,availibleParams={}){
    
    const newObjectRef=useRef(initialiseNewObject(oldObject,editMode));
    const [newObject,setNewObject]=useState(initialiseNewObject(oldObject,editMode));
    const [currentlyEditedItemKey,setCurrentlyEditedItemKey]=useState(null);

    useEffect(()=>{
        newObjectRef.current=initialiseNewObject(oldObject,editMode)
        setNewObject(Object.assign({},newObjectRef.current));
        setCurrentlyEditedItemKey(null);
    },[oldObject, editMode]);
    
    function signalUnsavedChanges(){
        newObjectRef.current[currentlyEditedItemKey]=[3,newObject[currentlyEditedItemKey][1]];
        setNewObject(Object.assign({},newObjectRef.current));;
        return
    }

    function editNewItem(itemKey){
        if (currentlyEditedItemKey) return signalUnsavedChanges();
        setCurrentlyEditedItemKey(itemKey);
        newObjectRef.current[itemKey]=[1,newObject[itemKey][1]];
        setNewObject(Object.assign({},newObjectRef.current));
    }

    function submitItem(key,newValue){
        // if (!newValue) return
        // console.log("submit", newValue)
        let newItemType=0;
        if (newValue!==oldObject[key]) newItemType=2;
        if (newValue===null||newValue==='undefined'||newValue==="") {newValue=newObject[key][1];newItemType=3}
        newObjectRef.current[key]=[newItemType,newValue];
        setNewObject(Object.assign({},newObjectRef.current));
        setCurrentlyEditedItemKey(null);
    }

    function cancelEdit(){
        // console.log('cancelling ',currentlyEditedItemKey,newObject[currentlyEditedItemKey])
        const newItemType=(oldObject[currentlyEditedItemKey]===newObject[currentlyEditedItemKey][1])?0:2;
        newObjectRef.current[currentlyEditedItemKey]=[newItemType,newObject[currentlyEditedItemKey][1]];
        setNewObject(Object.assign({},newObjectRef.current));;
        setCurrentlyEditedItemKey(null);
    }
    
    function resetItem(itemKey){
        newObjectRef.current[itemKey]=[0,oldObject[itemKey]];
        setNewObject(Object.assign({},newObjectRef.current));
    }

    function deleteItem(itemKey){
        newObjectRef.current[itemKey]=[0,emptyItemValue];
        setNewObject(Object.assign({},newObjectRef.current));;
    }

    function addItem (itemKey){
        if (!itemKey) return
        if (Object.keys(newObject).includes(itemKey)) {
            if (!currentlyEditedItemKey) editNewItem(itemKey)
            return 
        }
        if (currentlyEditedItemKey) {
            signalUnsavedChanges();
            newObjectRef.current[itemKey]=[0,""];
        } 
        else {
            newObjectRef.current[itemKey]=[1,""];
            setCurrentlyEditedItemKey(itemKey);
        }
        setNewObject(Object.assign({},newObjectRef.current));
    }

    function prepareSubmittable(){
        if (currentlyEditedItemKey) {signalUnsavedChanges(); return null;}
        return prepareSubmittableFromEditable(newObject);
    }

    function filterEditableObject({object,filter="",exactFiltering=false}){
        const filteredObject = Object.fromEntries(Object.entries(object || newObject).filter(([key,value=[0,'']])=>{
            if (exactFiltering && (value[1]===filter || key[1]===filter)) return true;
            if (!exactFiltering && ((value[1] && typeof(value[1])==='string' && value[1].toLowerCase().includes(filter.toLowerCase())) || key.toLowerCase().includes(filter.toLowerCase()))) return true
            if (key===currentlyEditedItemKey) return true;
            return false
        }))
        // if (currentlyEditedItemKey && true)  filteredObject[currentlyEditedItemKey]=newObject[currentlyEditedItemKey];
        return filteredObject;
    }

    const getAvailibleParams=useCallback((key)=>{
        try {
            if (!Object.keys(availibleParams).includes(key)) throw new Error();
            const itemAvailibleParams = new param(availibleParams[key]);
            
            return itemAvailibleParams;
        }
        catch {
            return new param();
        }
        //eslint-disable-next-line
    },[])
 return {newObject,editNewItem,submitItem,cancelEdit,resetItem,addItem,deleteItem,prepareSubmittable,filterEditableObject,getAvailibleParams};
}
// const { useState, useEffect } = require("react");

// function initialiseNewObject(oldObject,editMode){
//     const itemType=editMode?0:(-1);
//     const newObject={};
//     for (const key in oldObject){
//         newObject[key]=[itemType,oldObject[key]];
//     }
//     return newObject
// }


// export default function useEditableObject(oldObject,editMode=true){
    
    
//     const [newObject,setNewObject]=useState(initialiseNewObject(oldObject,editMode));
//     const [currentlyEditedItemKey,setCurrentlyEditedItemKey]=useState(null);

//     useEffect(()=>{
//         setNewObject(initialiseNewObject(oldObject,editMode));
//         setCurrentlyEditedItemKey(null);
//     },[oldObject, editMode]);
    
//     function editNewItem(itemKey){
//         if (currentlyEditedItemKey) submitItem();
//         setCurrentlyEditedItemKey(itemKey);
//         setNewObject({...newObject,[itemKey]:[1,newObject[itemKey][1]]})
//     }

//     function submitItem(newValue){
//         console.log(newValue);
//         let newItemType=0;
//         if (newValue!==oldObject[currentlyEditedItemKey]) newItemType=2;
//         if (!newValue) {newValue=newObject[currentlyEditedItemKey][1];newItemType=3}
//         setNewObject({...newObject,[currentlyEditedItemKey]:[newItemType,newValue]});
//         setCurrentlyEditedItemKey(null);
//     }

//     function cancelEdit(){
//         const newItemType=(oldObject[currentlyEditedItemKey]===newObject[currentlyEditedItemKey][1])?0:2
//         setNewObject({...newObject,[currentlyEditedItemKey]:[newItemType,newObject[currentlyEditedItemKey][1]]})
//         setCurrentlyEditedItemKey(null);
//     }
    
//     function resetItem(itemKey){
//         setNewObject({...newObject,[itemKey]:[0,oldObject[itemKey]]})
//     }
//  return {newObject,editNewItem,submitItem,cancelEdit,resetItem};
// }