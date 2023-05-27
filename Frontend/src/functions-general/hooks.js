import { useEffect, useState } from "react";

export function useDebounce(value,delay){
    const [debouncedValue,setDebouncedValue]=useState(value);

    useEffect(()=>{

        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        },delay);

        return () =>{
            clearTimeout(handler);
        };
    },[value,delay]);

    return debouncedValue;
}

export function useLocalStorage (key, defaultValue){
    const [value, setValue] = useState(() => {
      let currentValue;
  
      try {
        currentValue = JSON.parse(
          localStorage.getItem(key) || String(defaultValue)
        );
      } catch (error) {
        currentValue = defaultValue;
      }
  
      return currentValue;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  };
  
// export function useCharacterCard(){

//   function getLocalStorageCharCard(){
//     const photo=localStorage.getItem("charCardPhoto");
//     const label=localStorage.getItem("charCardLabel");
//     const color=localStorage.getItem("charCardColor");
//     return {photo,label,color}
//   }
//   function setLocalStorageCharacterCard(){

//   }
//   function deleteLocalStorageCharacterFile(){

//   }
//   const image="";
//   const label="";
//   const color="";
// }