import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ItemCardList from '../components-other/ItemCardList'
import { useShowOverlay } from 'context-global/showOverlay';

export default function CollectionList({updateItemsFunction}) {
 const [items,setItems]=useState([]);
 const {showErrorOverlay}=useShowOverlay();
 const navigate=useNavigate();
 
 function updateCollectionList(){
    updateItemsFunction().then(
        response=>{
            // setTotalPages(Math.ceil(response.totalItems/itemsPerPage));
            setItems(response.items);
        }
    ).catch(error=>{console.log(error); showErrorOverlay(error)});
}

 function clickCollection(collection){
    navigate(`/collection/${collection._id}`);
 }
useEffect(()=>{
    updateCollectionList();
    //eslint-disable-next-line
},[])
  return (
    <>
    <ItemCardList items={items} itemKeyStr='_id' itemTitleStr='name' itemImageStr='img_url' onItemClickFunction={clickCollection}/>
    </>
  )
}
