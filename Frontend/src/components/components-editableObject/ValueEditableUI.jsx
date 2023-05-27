import { Typography, Button, IconButton, Checkbox, TextField } from '@mui/material';
import React from 'react';
// const Add=()=><>+</>;
// const CancelPresentation=()=><>x</>
// const Clear=()=><>x</>
// const Delete=()=><>-</>
// const Done=()=><>v</>
// const Edit=()=><>edit</>
import Add from '@mui/icons-material/Add'
import CancelPresentation from '@mui/icons-material/CancelPresentation';
import Clear from '@mui/icons-material/Clear'
import Delete from '@mui/icons-material/Delete'
import Done from '@mui/icons-material/Done'
import Edit from '@mui/icons-material/Edit'

export function ValueEditableUI({
        displayType, 
        itemParams={
            inputType:''
        },
        label,value,setValue,
        editNewItem,cancelEdit,resetItem,deleteItem,handleSubmit,
    }){
        
        // if (!itemParams.inputType) 
        // console.log({label,value,itemParams});
    const Buttons= 
    // useMemo(        ()=>{    return 
    {
        Edit:()=>(!itemParams.disabled?<IconButton onClick={editNewItem}><Edit/></IconButton>:<></>),
        Submit:()=>(<IconButton onClick={handleSubmit}><Done/></IconButton>),
        Cancel:()=>(<IconButton onClick={cancelEdit}><Clear/></IconButton>),
        Reset:()=>(<IconButton onClick={resetItem}><CancelPresentation/></IconButton>),
        Delete:()=>(!itemParams.required?<IconButton onClick={deleteItem}><Delete/></IconButton>:<></>),
        Add:()=>(<IconButton onClick={editNewItem}><Add/></IconButton>)
        //eslint-disable-next-line
    }
// } ,[])
    // useEffect(()=>{console.log("rerender because itemFunctions")},[cancelEdit,editNewItem,deleteItem,resetItem])
    // useEffect(()=>{console.log("rerender because handleSubmit")},[handleSubmit])

    switch (itemParams.inputType){
        //for unique (not string or number) values
        case 'checkbox': {
            if (!['true','false',true,false,'',null].includes(value)) return null
            switch (displayType){
                case 'DisplayValue': return <Checkbox checked={(value==="true"||value===true)} disabled/>
                case 'EmptyValue': return <><Checkbox checked={false} disabled/><Buttons.Add/></>
                case 'EditableValue': return <>
                    <Checkbox checked={value==="true"||value===true}
                        onChange={(e)=>{setValue(String(e.target.checked))}}/>
                    <Buttons.Delete/>
                    </>
                case 'EditField':   
                    handleSubmit(null,"false"); 
                    return <></>
                case 'EditedItem': return <>
                    <Checkbox checked={value==="true"||value===true}
                        onChange={(e)=>{setValue(String(e.target.checked))}}/>
                    <Buttons.Reset/>
                    <Buttons.Delete/>
                </>
                default: break;
            }
        }

        /* eslint-disable no-fallthrough */
        case 'select':
        case 'input':
        case 'autocomplete':
        case 'color':
        /* eslint-enable no-fallthrough */
            if (typeof(value)!=='string' && value!==null) return null
            switch (displayType) {

            case 'DisplayValue': return (
                <Typography variant='string'>{value}</Typography>
            );
            case 'EmptyValue': return (
                <>
                <Button variant='contained' disabled>{label}</Button>
                <Buttons.Add/>
                </>
            );
    
            case 'EditableValue': return (
                <>
                <Button variant='outlined' onClick={editNewItem}>{value}</Button>
                <Buttons.Delete/>
                </>
            );
    
            case 'EditField': return (
                    <>
                    <EditField {...{inputType:itemParams.inputType}}/>,
                    <Buttons.Submit/> <Buttons.Cancel/>
                    </>
            );
    
            case 'EditedItem': return (
                <>
                <Button variant='contained' onClick={editNewItem}>{value}</Button>
                <Buttons.Reset/>
                <Buttons.Delete/>
                </>
            );
    
            default: return null;
        }
        default: return null
    }
    
    

    function EditField({inputType}){
        //value types could be
        //(string)(input) a simple  that can be anything
        //(string)(autocomplete) an autocomplete  that can be one of availible value but also anything 
        //(string)(select) a limited field  that can only be one of availible values 
        //(boolean) (checkbox)
        // itemParams
        switch (inputType){
            case 'input': return (
                <TextField
                    id={label} 
                    name={label} 
                    label={label}
                    // color={itemType===3?"error":"white"}
                    autoFocus 
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}/>
            )
            case 'autocomplete': return (
                //return  <Autocomplete /> from MUI, according documentation
                <EditField inputType='input'/>
            )
            case 'select': 
            //options can be: 
            //either ['option1','option2',...] then in param constructor i shall convert them into type 2
            //or {option1Label:'opt1Value','opt2Lbl':'opt2Val'}
            //if itemParams.filter return <Autocomplete /> from MUI, according documentation
            if (typeof(itemParams.options)!=='object'||itemParams===null) return <Button disabled>{value}</Button>
            return (
                <select name={label} value={value} onChange={e=>setValue(e.target.value)}>
                    {Object.entries(itemParams.options).map(([optionLabel,optionValue])=>(
                        <option key={optionValue} value={optionValue}>{optionLabel}</option>
                    ))}
                </select>
            )
            case 'radio':{
                return <>
                <EditField inputType='select'/>
                </>
            }
            case 'color':{
                return<>
                {itemParams.options?<EditField inputType='select'/>:null} <input type='color' name={label} value={value} onChange={e=>setValue(e.target.value)}/>
            </>
            }
    
            default:{
                return null
            }
        }

    }
}

// export const ________________ValueEditableUI={
//     none:null,
//     DisplayValue:({value,inputType})=>(
//             (inputType==='checkbox')?<Checkbox checked={(value==="true"||value===true)} disabled/>
//             :<Typography variant='string'>{value}</Typography>
//     ),
//     EmptyValue:({label,editNewItem,inputType})=>(
//         <>
//         {(inputType==='checkbox')?<Checkbox disabled/>
//         :<Button variant='contained' disabled>{label}</Button>
//         }
//         <IconButton onClick={editNewItem}>+</IconButton>
//         </>
//     ),
//     EditableValue:({editNewItem,itemValue,inputType,required,deleteItem})=>(
//         <>
//         {(inputType==='checkbox')?<EditFieldComponent {...{inputType,}}/>
//         :<Button variant='outlined' onClick={editNewItem}>{itemValue}</Button>
//         }
//         {!required?<IconButton onClick={deleteItem}>Del</IconButton>:null}
//         </>
//     ),
//     EditField:(props)=>{
//         const {handleSubmit,cancelEdit}=props;
//         if (props.inputType==='checkbox') handleSubmit(null,{newValue:"false"});
//         return (
//         <>
//         <EditFieldComponent {...props}/>,
//         <IconButton onClick={handleSubmit}>V</IconButton>
//         <IconButton onClick={cancelEdit}>X</IconButton>
//         </>
//     )},
//     EditedItem:({itemValue,inputType,required,editNewItem,resetItem,deleteItem})=>(
//         <>
//         {(inputType==='checkbox')?<Checkbox disabled/>
//         :<Button variant='contained' onClick={editNewItem}>{itemValue}</Button>
//         }
//         <IconButton onClick={resetItem}>X</IconButton>
//         {!required?<IconButton onClick={deleteItem}>Delete</IconButton>:null}
//         </>
//     )
// }


// function EditFieldComponent( {inputType='input',availibleOptions=[],label:Elabel,itemValue:value,setNewItemValue:setValue=()=>{}}){
//     //value types could be
//     //(string)(input) a simple  that can be anything
//     //(string)(autocomplete) an autocomplete  that can be one of availible value but also anything 
//     //(string)(select) a limited field  that can only be one of availible values 
//     //(boolean) (checkbox)
//     if (typeof (availibleOptions)==='object' && !Array.isArray(availibleOptions)) availibleOptions=Object.entries(availibleOptions);
//     if (!Array.isArray(availibleOptions)) availibleOptions=[];//throw error

//     switch (inputType){
//         case 'input': {
//             return <input name={Elabel} color={"itemType"===3?"error":"white"} autoFocus value={value} onChange={(e)=>setValue(e.target.value)}/>
//         }
//         case 'autocomplete': {
//             return <input name={Elabel} color={"itemType"===3?"error":"white"} autoFocus value={value} onChange={(e)=>setValue(e.target.value)}/>
//         }
//         case 'select': {
//             return <>
//             <select name={Elabel} value={value} onChange={e=>setValue(e.target.value)}>
//                 {availibleOptions.map(([optionLabel,optionValue])=>(
//                     <option key={optionValue} value={optionValue}>{optionLabel}</option>
//                 ))}
//             </select>

//         </>}
//         case 'checkbox':{
//             return <Checkbox name={Elabel}
//               checked={value==="true"||value===true}
//               onChange={(e)=>{e.target.value=String(e.target.checked); setValue(String(e.target.checked))}}/>
//         }
//         case 'radio':{
//             return <>
//             {availibleOptions.map((option)=>{
//                 return <div key={option}><input type='radio' name={Elabel} value={option} checked={option===value} onChange={(e)=>setValue(e.target.value)}/>{option}</div> 
//             })}
//             </>
//         }
//         case 'color':{
//             return<>
//             {availibleOptions?<EditFieldComponent inputType='select' {...{availibleOptions,label:Elabel,value,setValue}}/>:null}
//             <input type='color' name={Elabel} value={value} onChange={e=>setValue(e.target.value)}/>
//         </>
//         }

//         default:{
//             return null
//         }
//     }
// }