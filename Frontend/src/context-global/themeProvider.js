import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { themeOptions } from './themes/themes';

const themeContext=createContext();

export const ThemeProviderComponent=({children})=> {
  const [currentTheme,setCurrentTheme]=useState('standart');
  const [theme,setTheme]=useState(createTheme('standart'))

  useEffect(()=>{
    if(!themeOptions[currentTheme]) {setCurrentTheme('standart'); return}
    setTheme(createTheme(themeOptions[currentTheme]))
  },[currentTheme])

  return (
    <themeContext.Provider value={setCurrentTheme}>
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
    </themeContext.Provider>
  )
}

export function useChangeTheme(){
  const setCurrentTheme=useContext(themeContext);
  const options=Object.keys(themeOptions);

  const handler=(newTheme)=>{
    if (options.includes(newTheme)) setCurrentTheme(newTheme);
  }

  return {setCurrentTheme:handler,options}
}
