import React, { useCallback, useEffect, useState } from 'react'

export default function useFetch(apiHandler) {
    const [isSendingRequest,setIsSendingRequest]=useState(false);
    const sendRequest = useCallback(()=>{setIsSendingRequest(true)},[isSendingRequest]);
    const [isLoading,setIsLoading]=useState(false);
    const [response,setResponse]=useState(null);
    const [isSuccess,setIsSuccess]=useState(false);
    const [error,setError]=useState(null);
    const send=useCallback(()=>createFetchFunctionFromHandler(apiHandler),[])

    useEffect(()=>{
        if (!isSendingRequest) return
        async function fetch(){
            try{
                const response=await send();
                if (!response) throw new Error('failed to fetch');
                setResponse(response);
                setIsSuccess(true);
            }
            catch (err){
                setError(err)
            }
        }
        setIsLoading(true);
        setIsSuccess(false);
        setError(null);
        fetch();
        setIsSendingRequest(false);
    },[isSendingRequest]);

  return {isLoading,isSuccess,error,response,sendRequest}
}
