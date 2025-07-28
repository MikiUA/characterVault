import { apipostNewCollection } from 'functions-api/apiGallleryFunctions';
import CollectionEditor from 'components/components-gallery/components-collections/CollectionEditor';

export default function AddCollectionPage() {
    const newCollection={
      name:'',
      description:'',
      view_access:'private',
      edit_access:'private',
      type:'collection',
    }
    function submitCollection(collectionObject){
      return new Promise((resolve,reject)=>{
        if (1) reject({message:'not implemented yet'});
        else apipostNewCollection(collectionObject).then(()=>{
          resolve();
        }).catch((err)=>reject(err));
      })
      
    }
  
    return (
      <CollectionEditor collection={newCollection} handleSubmit={submitCollection}/>
    )
  }