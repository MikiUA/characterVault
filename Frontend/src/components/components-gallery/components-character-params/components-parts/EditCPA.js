import React,{useState} from "react";

export function EditCPA({char={}}){
    const [isAddingItem,setIsAddingItem]= useState(false);
    const [additionalParams,setAdditionalParams]= useState();
    
    function addParam(newParamKey=''){
        if (additionalParams.includes(newParamKey)){
            //should probably display a message
        }
        else {
            setIsAddingItem(false);
            setAdditionalParams([...additionalParams,newParamKey]);
        }
    }

    function removeParam(paramKey){
        setAdditionalParams(prevState=> prevState.filter((item)=>(item!==paramKey)));
    }

    return(
        <div>            
            <button type='button' onClick={()=>setIsAddingItem(true)}>AddItem</button>
            {isAddingItem?<AddItemOverlay close={()=>setIsAddingItem(false)} handleSubmit={addParam}/>:''}
            {additionalParams.map((key)=>(
                <div key={'additional '+key}>
                    {key} : <input name={'additional '+key} defaultValue={char['additional params'][key]} pattern="^[^[\]{\}]+$" required/> 
                    <button onClick={(e)=>{e.preventDefault();removeParam(key)}}>DEL</button></div>
            ))}
        </div>
    )
}