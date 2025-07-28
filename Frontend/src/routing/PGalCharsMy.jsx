import { useUserID } from 'context-global/userContext';
import { apigetMyCharacters, } from 'functions-api/apiGallleryFunctions';
import GalleryLogic from 'components/components-gallery/GalleryLogic';

export default function MyCharactersPage() {
  const stored_userID=useUserID();
  // so now we either have self or someone else as userID to search

  function updateItemsFunction(filter){
    return new Promise((resolve,reject)=>{
        if (!stored_userID) reject({message:'User is not specified'});
        return apigetMyCharacters(filter).then(item=>resolve(item)).catch(err=>reject(err));
    })
  }
  return (
    <GalleryLogic updateItemsFunction={updateItemsFunction} user_edit_access={true}/>
  )
}
