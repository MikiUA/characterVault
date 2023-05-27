import { useEffect, useState } from 'react'
import { useEditableObjectItemFunctions } from './editObjectContext';
import { ValueEditableUI } from './ValueEditableUI';

export default function ValueEditable({label='',value=[]}) {

    //deprecated //if type===1 add event listener on click not on div to submit param 
    //if type changes remove that listener
    let {editNewItem,submitItem,cancelEdit,resetItem,deleteItem,itemParams}=useEditableObjectItemFunctions(label);

    const [displayType,setDisplayType]=useState(null); 
    const [newItemValue,setNewItemValue]=useState(value[1]);
    function handleSubmit(e,newValue){
        //TODO: test newItemValue against inputPattern
        console.log({newItemValue});
        submitItem(newValue||newItemValue);
    }
    //displayType switch
    useEffect(()=>{
        if (value[0]!==3)setNewItemValue(value[1]);

        function itemSwitch([itemType=-1,itemValue='']){
            if (itemType===-1 || itemParams.disabled)  return "DisplayValue";
            if (itemType===0 && (itemValue==="")) return  "EmptyValue";
            if (itemType===0)   return "EditableValue";
            if (itemType===1 || itemType===3) return "EditField";
            if (itemType===2) return "EditedItem"
            setDisplayType(null);
        };
        setDisplayType(itemSwitch(value));
        //eslint-disable-next-line
    },[value])

    // if (checkTypeOf(value,itemParams.inputType)) return null;
    return <ValueEditableUI {...{
        displayType, itemParams,
        label,value:newItemValue,setValue:setNewItemValue,
        editNewItem,cancelEdit,resetItem,deleteItem,handleSubmit
    }}/>;
}

// function checkTypeOf(value,inputType){
//     if (typeof(value[0])!=='string') return false;
//     const t=typeof(value[1]);
//     if (t==='function') return false;
//     if (t!=='object') return true;//TODO break this thing apart into strings and bools
//     if (value[1]===null) return true;
//     if (inputType==='array' && Array.isArray(value[1])) return true
//     return false
// }