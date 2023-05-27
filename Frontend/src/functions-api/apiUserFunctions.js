import { authApiLinks } from "./parameters/apiLinks";
import { fetchParamObject } from "./parameters/fetchParamObject";

export function apigetCheckUser(editToken=''){
    let url=authApiLinks.checkUser;

    return new Promise((resolve,reject)=>{
        fetch(url,fetchParamObject('GET',editToken)).then(
            response=>{        
                //can be 200/201 created with new viewToken
                //can be 401 because of bad editToken
                response.json().then(jsonres=>{
                    if (!response.ok) reject({status:response.status,message:jsonres.message})
                    else resolve(jsonres)}
                    );
            }
        ).catch(err=>{
            reject({status:-1,message:err.message})
        });
    })
    
    
}

export function apigetNewViewToken(editToken=''){

    let url=authApiLinks.requestNewViewToken;
    return new Promise((resolve,reject)=>{
        fetch(url,fetchParamObject('GET',editToken)).then(
            response=>{
                //can be 201 created with new viewToken
                //can be 401 because of bad editToken
                response.json().then(jsonres=>{
                    if (!response.ok) reject({status:response.status,message:jsonres.message})
                    else resolve(jsonres)}
                    );
            }
        ).catch(err=>{
            reject({status:-1,message:err.message})
        });
    })
}