import Loader from "components/components-general/Loader";
import useEditableObjectHook from "./useEditableObject";
import  React,{ createContext, useContext, useMemo} from "react"

const context=createContext();

export function EditableObjectProvider({children,object,editMode,availibleParams}){
    const editableObject=useEditableObjectHook(object,editMode,availibleParams);
    // const {newObject,editNewItem,submitItem,cancelEdit,resetItem,addItem,deleteItem}=useEditableObjectHook(object,editMode);
    if (!editableObject.newObject) return <Loader/>
    // if (!newObject) return <Loader/>
    return <context.Provider value={editableObject}>
    {/* return <context.Provider value={{newObject,editNewItem,submitItem,cancelEdit,resetItem,addItem,deleteItem}}> */}
        {children}
    </context.Provider>
}
// {newChar}=useContext
// display new char
// item object Map(key,velue)=>
//<>
//  {key}:
//  Editable Item {value}
//</>

export function useEditableObject(){
    const {newObject,filterEditableObject,prepareSubmittable}=useContext(context);
    return {
        editableObject:newObject,
        filterEditableObject:({object,filter,exactFiltering})=>filterEditableObject({object,filter,exactFiltering}),
        prepareSubmittable
    };
}

export function useEditableObjectItemFunctions(key){
    const {editNewItem,submitItem,resetItem,cancelEdit,deleteItem,getAvailibleParams}=useContext(context);
    const itemParams=useMemo(()=>(getAvailibleParams(key)||{}
    //eslint-disable-next-line
    ),[ ])
    return {
        itemParams:itemParams,
        editNewItem:()=>editNewItem(key),
        submitItem:((newValue)=>submitItem(key,newValue)),
        resetItem:(()=>resetItem(key)),
        cancelEdit:(()=>cancelEdit()),
        deleteItem:(()=>deleteItem(key))
    }
}

export function useEditableObjectItemAdder(){
    const {addItem}=useContext(context);
    return {
        addItem:(key)=>addItem(key),
    }
}

export function useEditableObjectFilter(){
    const {filterEditableObject}=useContext(context);
    return ({object,filter,exactFiltering})=>filterEditableObject({object,filter,exactFiltering});
}

export function useEditableObjectValue(fullValue){
    return fullValue[1];
}