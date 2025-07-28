
import { useUserID } from 'context-global/userContext';
import { apigetCharacter, apipatchCharacter } from 'functions-api/apiGallleryFunctions';
// import CharacterViewerLogic from 'components/components-gallery/components-characters/CharacterViewer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import CharacterEditor from 'components/components-gallery/components-characters/CharacterEditor';
import { useShowOverlay } from 'context-global/showOverlay';
import ViewCPFull from 'components/components-gallery/components-character-params/ViewCPFull';

export default function CharacterPage() {
  const {charID}=useParams();
  const userID=useUserID();

  const [character,setCharacter]= useState(null);
  const [isCharEditable,setIsCharEditable]=useState(false);
  const [editMode,setEditMode]=useState(false);
  function toggleEditMode(){setEditMode(!editMode)} //view mode, edit mode, full edit mode
  const {showErrorOverlay}=useShowOverlay();

  const [submitCharacterHandler,setSubmitCharacterHandler]=useState(null);

  useEffect(()=>{
    if (!charID) return
    apigetCharacter(charID).then(character=>{
      setCharacter(character);
      if (character.host===userID){
        setIsCharEditable(true);
        // setMode('edit mode');
      }
    }).catch(err=>showErrorOverlay(err));
    //eslint-disable-next-line
  },[userID,charID])

  function fullEditCharacter(updatedCharacter={}){
    console.log({updatedCharacter})
    return new Promise ((resolve,reject)=>{
      apipatchCharacter(charID,updatedCharacter).then(()=>{
        setCharacter(updatedCharacter);
        setSubmitCharacterHandler(null);
        setEditMode(false);
        resolve();
      }).catch(err=>showErrorOverlay({message:err.message,status:err.status}))
    })
  }

  if (!character) return null
  return (
    <div>
      {editMode?<button onClick={()=>setSubmitCharacterHandler(()=>fullEditCharacter)}>Submit</button>:""}
      {isCharEditable?<button onClick={()=>toggleEditMode()}>{editMode?"Cancel":"Edit"}</button>:''}
      <ViewCPFull character={character} editMode={editMode} submitHandler={submitCharacterHandler}/>
    </div>
  )
}
