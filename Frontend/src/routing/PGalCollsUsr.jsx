import { apigetUserCollections } from 'functions-api/apiGallleryFunctions';
import { useParams } from 'react-router-dom';
import CollectionList from 'components/components-gallery/components-collections/CollectionList';

export default function UserCollectionsPage() {
  const {userID} = useParams();
  // so now we either have self or someone else as userID to search

  function updateItemsFunction(filter){
    return new Promise((resolve,reject)=>{
       if (userID) return apigetUserCollections(userID,filter).then(item=>resolve(item)).catch(err=>reject(err));
      reject({message:'User is not specified'});
    })
  }
  return (
    <CollectionList updateItemsFunction={updateItemsFunction}/>
  )
}
