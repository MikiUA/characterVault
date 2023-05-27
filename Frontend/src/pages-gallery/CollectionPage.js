import { apigetCollectionParams, apigetCollectionCharacters } from 'functions-api/apiGallleryFunctions'
import { useParams } from 'react-router-dom';
import GalleryLogic from 'components/components-gallery/GalleryLogic'

export default function CollectionPage() {
  const {collectionID}=useParams();
  //eslint-disable-next-line
  function getCollectionParams(){
        apigetCollectionParams(collectionID)
        //so the responses i could get:
        //server error
        //401 if view_access of this collection is not public
        //403 if view_access of this collection is array and does not include me

        //200 normal response as follows:{
        // host of this collection
        // my edit access to this collection
        // if i have edit access it also gives me view_access and edit_access params for this collection
        // type of this collection (collection/workflow)
        // additional_char params array
        // coloring_params object
        // }
  }
	function updateGallery(filter){
    return new Promise((resolve,reject)=>{
      if (!collectionID) reject({message:'Collection is not specified'});
      return apigetCollectionCharacters(collectionID,filter).then(item=>resolve(item)).catch(err=>reject(err));
  })
	}
  return (
	<GalleryLogic updateItemsFunction={updateGallery} user_edit_access={false}/>
  )
}