import React, { useEffect, useState } from 'react'

export default function useApiRequest(apiRequestFunction= new Promise()) {
    const [isLoading,s1]=useState();
    const [isSuccess,s2]= useState();
    const [response,setRes]=useState();

    useEffect(()=>{
        apiRequestFunction().then(

        ).catch(

        )
    },[])
  return (
    <div>useApiRequest</div>
  )
}
