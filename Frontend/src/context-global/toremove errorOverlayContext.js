import { createContext, useContext, useState } from "react";
import { ErrorOverlay } from "componentsGeneral/Overlay";

const errorOverlayContext = createContext();

export const ErrorOverlayContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  return (
    <errorOverlayContext.Provider value={setError}>
      {children}
      {error?<ErrorOverlay error={error} closeOverlay={()=>setError(null)}/>:''}
    </errorOverlayContext.Provider>
  );
};

export const useDispatchErrorOverlay=()=>{
    const setError=useContext(errorOverlayContext);
    return setError;
}