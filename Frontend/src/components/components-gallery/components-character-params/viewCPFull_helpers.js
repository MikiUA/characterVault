const { characterClass } = require("parameters-general/characterClass");

export function getEssentialCharParamsFromObject(object,needRest=false){
    const {shname,fname,refname,description,host,is_DnD,view_access,img_url,main_color,date_created,date_modified,...rest}=object;
    if (!needRest) return {shname,fname,refname,description,host,is_DnD,view_access,img_url,main_color,date_created,date_modified}
    return rest
}

export function getDnDCharParamsFromObject(object,needRest=false){
    if (object["dnd params"]) return object["dnd params"];
    if (!needRest) return {}
    return object
}
export function getAdditionalCharParamsFromObject(object,needRest=false){
    if (object["additional params"]) return object["additional params"]
    if (!needRest) return getEssentialCharParamsFromObject(object,true);
    return object
}


export function dumpAllCharacterParamsIntoSimpleObject(characterObject){
    const essentials=getEssentialCharParamsFromObject(characterObject);
    const dnd=getDnDCharParamsFromObject(characterObject);
    const add=getAdditionalCharParamsFromObject(characterObject);
    const newObject= Object.assign({},essentials,dnd,add);
    // console.log({dumpedObject:newObject})
    return newObject;
}

export function prepareSubmittableCharacterFromSimpleObject(simpleObject,oldCharacter){
    let character=new characterClass(oldCharacter);
    const essentials=getEssentialCharParamsFromObject(simpleObject);
    for (const param in essentials){
        character[param]=essentials[param];
    };
    character["additional params"]=getAdditionalCharParamsFromObject(simpleObject);
    character["dnd params"]=getDnDCharParamsFromObject(simpleObject)
    return character;
}