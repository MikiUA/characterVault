import React, { createContext, useContext, useState } from 'react'

const langContext=createContext();
const uatext={
    'My characters':'Мої персонажі'
}
const entext={
    'My Characters':'My characters'
}
const availibleLangOptions={
    ua:uatext,
    en:entext
}
export const LanguageContextProvider=({children})=> {
    //eslint-disable-next-line
    const [currentLanguage,setCurrectLanguage]=useState('en');
    const fullObject = availibleLangOptions[currentLanguage];
  return (
    <langContext.Provider value={{text:{fullObject}}}>
        {children}
    </langContext.Provider>
  )
}

export function useFullText(){
    const {text}=useContext(langContext);
    return text;
}

//use example?
// import text
// text['My Characters'];