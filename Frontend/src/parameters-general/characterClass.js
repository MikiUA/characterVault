//simply used to simplify developer access to params, 
//character object is never modified unless user sends the data to the server and gets the new data back
import { useMemo } from "react";

  export class characterClass{
    _id="";
    host="";
    is_DnD=false;
    view_access="private";
    img_url="";
    refname="";
    shname="";
    fname="";
    description="";
    main_color="";
    date_created=0;
    date_modified=0;
    ["dnd params"]={};
    ["additional params"]={};

    constructor(char){
      if (!char) return
        // this.createCharacter(props);
        this._id=char._id;
        this.host=char.host;
        this.is_DnD=char.is_DnD;
        this.view_access=char.view_access;
        this.refname=char.refname;
        this.shname=char.shname;
        this.fname=char.fname || char.shname;
        this.description=char.description;
        this.main_color=char.main_color;
        this.date_created=char.date_created||0;
        this.date_modified=char.date_modified||0;
        this["dnd params"]=char["dnd params"];
        this["additional params"]=char["additional params"];
    }  }

    export function useCharacter(newCharacter){
      const character=useMemo(() => new characterClass(newCharacter), [newCharacter]);
      return character;
}



    // essential_character_params={
    //     _id:{
    //         isRequired:true,
    //         isEditable:false,
    //     },
    //     host:{
    //         isRequired:true,
    //         isEditable:false,
    //         label:'the user who put the character on website'
    //     },
    //     view_access:{
    //         isRequired:true,
    //         isEditable:true,
    //         label:'If other users will be able to see your character'
    //     },
    //     img_url:{
    //         isRequired:false,
    //         isEditable:true,
    //     },
    //     refname:{
    //         isRequired:false,
    //         isEditable:true,
    //         label:'this field should be used to search our characters'
    //     },
    //     short_name:{
    //         isRequired:true,
    //         isEditable:true,
    //         label:'Default displayable character name, up to 10 symbols'},
    //     full_name:{
    //         isRequired:false,
    //         isEditable:true,
    //         label:''},
    //     description:{
    //         isRequired:true,
    //         isEditable:true,},
    //     date_created:{
    //         isRequired:true,
    //         isEditable:false,},
    //     date_modified:{
    //         isRequired:true,
    //         isEditable:false,}
    //   }
    
