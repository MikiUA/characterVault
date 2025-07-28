import { apipostNewCharacter } from 'functions-api/apiGallleryFunctions'
// import CharacterEditor from 'components/components-gallery/components-characters/CharacterEditor'
import ViewCPFull from 'components/components-gallery/components-character-params/ViewCPFull';
import { useState } from 'react';

export default function AddCharacterPage() {
  const newChar={
    'is_DnD':false,
    'view_access':'private',
    'additional params':{
    }
  }
  function submitCharacter(characterObject){
    return new Promise((resolve,reject)=>{
      apipostNewCharacter(characterObject).then(()=>{
        resolve();
      }).catch((err)=>reject(err));
    })
  }
  const [submitHandler,setSubmitHandler]=useState(null);

  return ( 
    <>
    <button onClick={()=>setSubmitHandler(()=>submitCharacter)}>Submit</button>
    <ViewCPFull {...{character:newChar,editMode:true,submitHandler}}/>
    </>
    // <CharacterEditor character={newChar} submitCharacter={submitCharacter}/>
  )
}
