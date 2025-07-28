import { useUserID } from 'context-global/userContext';
import { apigetMyCollections } from 'functions-api/apiGallleryFunctions';
import CollectionList from 'components/components-gallery/components-collections/CollectionList';

export default function MyCollectionsPage() {
  const stored_userID=useUserID();
  // so now we either have self or someone else as userID to search

  function updateItemsFunction(filter){
    return new Promise((resolve,reject)=>{
        if (!stored_userID) reject({message:'User is not specified'});
        return apigetMyCollections(filter).then(items=>resolve(items)).catch(err=>reject(err));
    })
  }
  return (
    <CollectionList updateItemsFunction={updateItemsFunction}/>
  )
}
