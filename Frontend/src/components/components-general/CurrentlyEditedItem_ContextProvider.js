const { createContext, useState, useContext } = require("react");

const currentlyEditedItem=createContext();

export function CurrentlyEditedItem_ContextProvider({children}){
    const [item,setItem]=useState();
    return <currentlyEditedItem.Provider value={[item,setItem]}>
        {children}
        </currentlyEditedItem.Provider>
}

export function useCurrentlyEditedItem(){
    const [item,setItem]=useContext(currentlyEditedItem);
    return [item,setItem];
}