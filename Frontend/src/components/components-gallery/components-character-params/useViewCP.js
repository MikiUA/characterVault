import React, { useState } from 'react'

export default function useViewCP() {
    const [isEditMode,setIsEditMode]=useState(false);
    const [filter,setFilter]=useState('');
    const debouncedFilter=useDebounce(filter,500); 

    function CharCard(){
        
    }
    function CharInfoBlock(){

    }

    function FilterInput(){}

    function ParamDisplay(){}
    
  return {
  }
}
