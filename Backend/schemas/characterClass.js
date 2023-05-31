const { ObjectId } =require("mongodb");
// interface Color{}

const characterGenerationError=new Error('An error occured while generating a character. Missing or invalid requred fields');
exports.characterGenerationError=characterGenerationError;
exports.character=class{
    // _id:ObjectId;
    // host:String;
    // is_DnD:boolean=false;
    // view_access:'private'|'public'="private";
    // img_url:String|undefined;
    // refname:String;
    // shname:String;
    // fname:String;
    // description:String;
    // main_color:Color;
    // date_created:EpochTimeStamp;
    // date_modified:EpochTimeStamp;
    // ["dnd params"]:Object;
    // ["additional params"]:Object;

    // constructor(){}
    constructor(newCharacter){
        try{
        if (newCharacter===null || typeof(newCharacter)!=='object') throw 'e1';
        if (typeof(newCharacter.host)!=='string') throw 'e2';
        if (typeof(newCharacter.refname)!=='string') throw 'e3';
        if (typeof(newCharacter.shname)!=='string') throw 'e4';
        if (typeof(newCharacter.description)!=='string') throw 'e5';

        if (newCharacter._id instanceof ObjectId) this._id=newCharacter._id
        else this._id = new ObjectId();
        this.host=newCharacter.host;
        this.is_DnD=(newCharacter.is_DnD===true||newCharacter.is_DnD==='true')?true:false;
        this.view_access=(newCharacter.view_access==='public'||newCharacter.view_access==='private')?newCharacter.view_access:'private';
        this.img_url=newCharacter.img_url;
        this.refname=newCharacter.refname;
        this.shname=newCharacter.shname;
        this.refname=newCharacter.refname||newCharacter.shname;
        this.description=newCharacter.description;
        this.main_color=newCharacter.main_color || '#f0f0f0'
        this.date_created=newCharacter.date_created||Date.now();
        this.date_modified=Date.now();

        function getObject(params){
            if (params===null || typeof(params)!=='object') return {}
            return params
        }
        this["dnd params"]=getObject(newCharacter["dnd params"]||newCharacter.dnd_params);
        this["additional params"]=getObject(newCharacter["additional params"]||newCharacter.additional_params);
    }
    catch (err) {
        console.log(err);
        throw characterGenerationError
    }
    }
    updateCharacter(updatedChar){}
}

// module.exports={character,characterGenerationError};