import React, { Children, useContext, useEffect, useState } from 'react'


const apiPath="https://localhost:8081"
const apiPathContext  = React.createContext();

const [userToken,seUsetToken]=useState()
const userTokenContext = React.createContext();
const [userCollections,setUserCollections]=useState();
const [userAvailibleWorkflows,setUserAvailibleWorkflows]=useState();

export function useBackContext(){
  return useContext(BackendContext);
}

export function BackendContextProvider({children}) {
  useEffect({
    //here you are checking cookies for a token
    //if there is none set user to unlogged
    //if there is one you try to make backend connection to authorise
    //if authorise success backend should return updated token, user collections and workflows that user is allowed to view
  },[])
  return (
    <BackendContext.Provider value={apiPath}>
    <BackendContext.Provider value={apiPath}>
    <BackendContext.Provider value={apiPath}>
      {children}
    </BackendContext.Provider>
    </BackendContext.Provider>
    </BackendContext.Provider>
  )
}
