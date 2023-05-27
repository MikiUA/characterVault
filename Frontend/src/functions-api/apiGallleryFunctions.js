import { getEditToken, getViewToken } from "functions-api/parameters/tokenManagement";
import { galleryApiLinks } from "./parameters/apiLinks";
import { fetchParamObject } from "./parameters/fetchParamObject";

//#region localHandlers

function redirect_user_to_error_page(status=500,message=''){
    //redirect user to an error page, every status has a default message but just in case we can add a message prop
    window.location.href=`/error?status=${status}&message=${message}`
}
    
function actuallySendRequest({url='',method='GET',body={},redirectInsteadOfReject=false}){
    redirectInsteadOfReject=false
    const authToken=(method==='GET')?getViewToken():getEditToken();
    return new Promise((resolve,reject)=>{
        console.log('sending a ',method,' request to : ',url);
        if (method!=='GET' && body) console.log('req body : ',body);
        fetch(url,fetchParamObject(method,authToken,JSON.stringify(body))).then(
            res=>{
                res.json().then(jsonRes=>{
                console.log('status : ',res.status,'response : ', jsonRes);
                    if (res.ok) resolve(jsonRes);
                    else {
                        if (redirectInsteadOfReject) redirect_user_to_error_page(res.status,jsonRes.message)
                        else reject({status:res.status,message:jsonRes.message})
                    }
                })
            }
        ).catch(err=>{
            console.log('response err : ',err)
            if (redirectInsteadOfReject) redirect_user_to_error_page(-1,err.message)
            else reject({status:-1,message:err.message});
        })
    })
}

function jsonToQuery(object={}){
    let queryparams='?'
    for (let key in object){
        queryparams+=`${key}=${object[key]}&`
    }
    return queryparams
}
//#endregion    

//#region api get gallery
export function apigetGallery(filter={}){
    let url=galleryApiLinks.get.gallery+jsonToQuery(filter);
    return actuallySendRequest({url,redirectInsteadOfReject:true})
}

export function apigetMyCharacters(filter={}){
    let url=galleryApiLinks.get.characterListMy+jsonToQuery(filter);
    return actuallySendRequest({url,redirectInsteadOfReject:true})
}

export function apigetMyCollections(filter={}){
    let url=galleryApiLinks.get.collectionListMy+jsonToQuery(filter);;
    return actuallySendRequest({url,redirectInsteadOfReject:true})
}
export function apigetUserCharacters(userID='',filter={}){
    let url=galleryApiLinks.get.characterListUser+userID+jsonToQuery(filter);
    return actuallySendRequest({url,redirectInsteadOfReject:true})
}

export function apigetUserCollections(userID,filter={}){
    let url=galleryApiLinks.get.collectionListUser+userID+jsonToQuery(filter);;
    return actuallySendRequest({url,redirectInsteadOfReject:true});
}
export function apigetAllCharacters(filter={}){
    let url=galleryApiLinks.get.characterListAll+jsonToQuery(filter);
    return actuallySendRequest({url,redirectInsteadOfReject:true});
}
export function apigetAllCollections(filter={}){
    let url=galleryApiLinks.get.collectionListAll+jsonToQuery(filter);
    return actuallySendRequest({url,redirectInsteadOfReject:true});
}

export function apigetCollectionCharacters(collectionID,filter){
    let url=galleryApiLinks.get.characterListCollection+collectionID+jsonToQuery(filter);
    return actuallySendRequest({url});
}

//#endregion

//#region api collection functions
export function apigetCollectionParams(collectionID){
    let url = galleryApiLinks.get.collection+collectionID;
    return actuallySendRequest({url,redirectInsteadOfReject:true});
}

export function apipostNewCollection(collectionParams={}){
    let url=galleryApiLinks.post.newCollection;
    return actuallySendRequest({url,method:'POST',body:collectionParams});
}

export function apipatchCollection(collectionID,collectionParams={}){
    let url=galleryApiLinks.patch.editCollection+collectionID;
    return actuallySendRequest({url,method:'PATCH',body:collectionParams});
}

export function apideleteCollection(collectionID){
    let url=galleryApiLinks.delete.deleteCollection+collectionID;
    return actuallySendRequest({url,method:'DELETE'});
}
//#endregion

//#region api character functions
export function apigetCharacter(characterID){
    let url=galleryApiLinks.get.character+characterID;
    return actuallySendRequest({url});
}

export function apipostNewCharacter(characterParams={}){
    let url=galleryApiLinks.post.newChar;
    return actuallySendRequest({url,method:'POST',body:characterParams})
}

export function apipatchCharacter(characterID,characterParams={}){
    let url=galleryApiLinks.patch.editChar+characterID;
    return actuallySendRequest({url,method:'PATCH',body:characterParams})
}

export function apideleteCharacter(characterID){
    let url=galleryApiLinks.delete.deleteChar+characterID
    return actuallySendRequest({url,method:'DELETE'})
}
//#endregion

export function apipostAssignCharacterToCollection(characterID,collectionID){
    let url=galleryApiLinks.post.assignCharToCollection;
    return actuallySendRequest({url,method:'POST',body:{characterID,collectionID}})
}

export function apideleteUnassignCharacterFromCollection(characterID,collectionID){
    let url=galleryApiLinks.delete.unassignCharFromCollection;
    return actuallySendRequest({url,method:'DELETE',body:{characterID,collectionID}})
}