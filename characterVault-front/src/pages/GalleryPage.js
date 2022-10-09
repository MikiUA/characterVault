import GallerySearchMenu from './elements/GallerySearchMenu';
import GalleryCharacterMenu from './elements/GalleryCharacterMenu';
import CharacterCard from './elements/CharacterCard';
import './styles/GalleryPage.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const linktoCharacters="http://localhost:8081/characters/";//this is the link to backend ("/characters" for gallery or "/characters/collectionID" for collection)
const linktoCharacters="http://192.168.1.100:8081/characters/";//this is the link to backend ("/characters" for gallery or "/characters/collectionID" for collection)

//this function gets char list from backend
function charArrToJSXCards(all_chars,setSelectedChar){
	let char_JSX_array=[];
	// console.log("turning ",all_chars.length," items to JSX");
	for (let i=0;i<all_chars.length;i++){

		char_JSX_array.push(
			<div onClick={()=>{setSelectedChar(all_chars[i])}}>
				<CharacterCard selected_char={all_chars[i]}/> 
			</div>
		)
	}
	return char_JSX_array;
}; //this function makes all diplayed


export default function GalleryPage(){
	const {collectionID}=useParams();

	
	const[all_chars,setAll_chars]=useState("");
    const[selectedChar,setSelectedChar]=useState("");//somewhat kostyl', inactive char menu only on {""}
	function setCharList(){
		// {collectionID}
		// console.log(collectionID);
		let fetchLink=linktoCharacters;
		if (collectionID && collectionID!==undefined) fetchLink=linktoCharacters+collectionID;
		// console.log("fetching",linktoCharacters," + ",collectionID);
		fetch(fetchLink).then( (responce)=>responce.json()).then(
		  (data)=> {
			if (data==="no collection found") return 0;
			
	// console.log(data);
			setAll_chars(data);
	})}

	useEffect(()=>{
		setCharList()
	},[collectionID]);//theoretically only does this onload, we need to load all characters and not reload them every frame
    // function charArrToJSXCards (charList){ }


    return (
    <div className='GalleryPage-container'>
        <div className='menu-container search-menu'> <GallerySearchMenu reload_gallery={setCharList} /></div>
        <div className={(selectedChar==="")?'hidden':'menu-container char-menu'}> <GalleryCharacterMenu char={selectedChar} unselectMenu={setSelectedChar}/></div>
		
	{/* <button onClick={setCharList()}>reload</button> */}
        <div className='gallery-container'>
           
            {charArrToJSXCards (all_chars,setSelectedChar)}
        </div>
    </div>
    )
}