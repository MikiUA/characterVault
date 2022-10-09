import { useState } from "react";
import CollectionCard from "./elements/CollectionCard"
import './styles/CollectionsPage.css'
import {Link} from 'react-router-dom'


// let linktoCollectionsBackend="http://localhost:8081/workflows/";
let linktoCollectionsBackend="http://192.168.1.100:8081/workflows/";

function collectionArrToJSXCards(all_colls){
	let coll_JSX_array=[];
	for (let i=0;i<all_colls.length;i++){
		let linkToGallery="/collection/"+all_colls[i]["_id"];
		coll_JSX_array.push(
			<Link to={linkToGallery}>
				<CollectionCard collectionName={all_colls[i]["workflow name"]}/> 
			</Link>
		)
	}
	return coll_JSX_array;
}; //this function gets collections list from backend


export default function CollectionsPage(){
    const [allWorkflows,setAllWorkflows]=useState("")

    function setCollectionList(){
		// if (collectionID && collectionID!==undefined) linktoCharacters+="/"+collectionID;
		// console
		fetch(linktoCollectionsBackend).then( (responce)=>responce.json()).then(
		  (data)=> {
			setAllWorkflows(data);
			// _id, workflow_name
	})}
    return <div> 
        <button onClick={()=>setCollectionList()}>refresh</button>
		<div className="collection-list-container">
			{collectionArrToJSXCards(allWorkflows)}
		</div>
    </div>    
}