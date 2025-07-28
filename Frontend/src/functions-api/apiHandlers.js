export class apiHandler{
    url;method='GET';query;body;authToken;
    constructor(handlerObj={
            url,
            method:'GET',
            tokenType,
            query,body
        }){
        return handlerObj
    }
}

export function createFetchFunctionFromHandler(handler){
    return async ({itemID,queryObj,body})=>{
        const url=handler.url+itemID?`/${itemID}`:''+`?${String(queryObj||'')}`;
        try {
            const response= await fetch(url,fetchParamObject(handler.method,handler.tokenType,body));
            const jsonResponse=await response.json();
    
            if (!response.ok) throw({status:response.status,message:jsonres.message})
            return jsonResponse
        }
        catch(err){

        }
    };
}

export const apiHandlers={
    login:new apiHandler({url:'',method:'POST',parameters:'body'}),
    signup:''
}