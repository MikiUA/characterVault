export function filterObject_filterfunction(object={},filterFunction=(key,value)=>{return false}){
    return Object.fromEntries(
        Object.entries(object).filter(([key,value])=>{
            return filterFunction(key,value);
        })
    ) 
}

export function filterObject_includesSting(object={},string=''){
    string=string.toLowerCase();
    return Object.fromEntries(
        Object.entries(object).filter(([key,value])=>{
            key=key.toLowerCase();
            if(key.includes(string) || (typeof(value)==='string' && value.toLowerCase().includes(string))) return true;
            else return false;
        })
    ) 
}