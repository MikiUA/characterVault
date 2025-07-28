import { apigetUserCharacters } from 'functions-api/apiGallleryFunctions';
import { useParams } from 'react-router-dom';
import GalleryLogic from 'components/components-gallery/GalleryLogic';

export default function UserCharactersPage() {
  const {userID} = useParams();
  // so now we either have self or someone else as userID to search

  function updateItemsFunction(filter){
    return new Promise((resolve,reject)=>{
       if (userID) return apigetUserCharacters(userID,filter).then(item=>resolve(item)).catch(err=>reject(err));
      reject({message:'User is not specified'});
    })
  }
  return (
    <GalleryLogic updateItemsFunction={updateItemsFunction}/>
  )
}
