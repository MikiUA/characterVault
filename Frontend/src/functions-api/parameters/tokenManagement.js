import { getCookie, setCookie } from "../../functions-general/cookie-management";

export function getViewToken(){
    return getCookie('viewToken');
}
export function getEditToken(){
    return localStorage.getItem('editToken');
}

export function setViewToken(token){
   setCookie('viewToken',token);
}

export function setEditToken(token){
    localStorage.setItem('editToken',token);
}