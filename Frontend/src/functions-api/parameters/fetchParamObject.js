export const fetchParamObject = (method='GET',authToken='',body={})=>{
    let paramObj={
        method: method,
        // mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }
  if (method!=='GET' && body!=={})
  paramObj.body=body;
  return paramObj;
}