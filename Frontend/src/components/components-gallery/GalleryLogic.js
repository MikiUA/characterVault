import React,{useEffect, useState} from 'react'
// import PropTypes from 'prop-types'
import GallerySearchMenu from './components-menus/GalleryMenuSearch'
import GalleryCharacterMenu from './components-menus/GalleryMenuCharacter';

import styles from './styles/GallleryLogic.module.css'
import {styled} from './styles/GalleryLogicStyles'
import PageSelector from './components-other/PageSelector';
import ItemCardList from './components-other/ItemCardList';
import { useShowOverlay } from 'context-global/showOverlay';
// import { useDispatchErrorOverlay } from 'context-global/errorOverlayContext';

function GalleryLogic({
    user_edit_access=false,
    availibleCharacterFields={},
    updateItemsFunction=function(filter){
        return new Promise(resolve=>resolve({totalItems:0,items:[]}))
    }}) 
    {
    const [charList,setCharList]=useState([]);   
    //     // function updateImageList(newItems=[]){setImageList((prevState)=>[...prevState,...newItems]);}
    
    const [toggledUI,setToggledUI] = useState(true);
    const [selectedCharacter,setSelectedCharacter]=useState(null);
    const [filter,setFilter] = useState({});
    // const [searchParams,setSearchParams]=useSearchParams();
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(10);
    const {showErrorOverlay}=useShowOverlay();

    function toggleUI(){
        setToggledUI(prevValue=>!prevValue)
    }

    function updateImageList(filter={}){
        updateItemsFunction(filter).then(
            response=>{
                setTotalPages(Math.ceil(response.totalItems/itemsPerPage));
                setCharList(response.items);
            }
        ).catch(error=>{console.log(error); showErrorOverlay(error)});
    }

    function submitFilters(newFilter={}){
        newFilter.page=currentPage;
        if(newFilter.itemsPerPage) setItemsPerPage(newFilter.itemsPerPage);
        setFilter(newFilter);
        updateImageList(newFilter);
    }
    function changePage(newPage){
        setCurrentPage(parseInt(newPage));
        let newFilter=filter;
        newFilter.page=newPage
        setFilter(newFilter)
        updateImageList(newFilter);
    }

    function selectCharacter(char=null){
        setSelectedCharacter(char);
    }
    function getCharacterCardColoring(char){
        if (!char || typeof(char)!=='object') return showErrorOverlay({message:'internal error in getting char colors'});
        return ({
            borderColor:'black',
            backgroundColor:char.main_color||'white',
            fontColor:'black'
        })
    }

    useEffect(()=>{
        // console.log('hi');
        //somehow get those search params into filter
        updateImageList();
        //eslint-disable-next-line
    },[]);

    // const [isLoading,setIsLoading]=useState(false);
    // const [error,setError]=useState(null);

    return (
        <styled.GalleryPageContainer>
        {/* <div className={styles['GalleryPage-container']}> */}
            {toggledUI?<styled.MenuBox>
            {/* <div className={styles['menu-container']}> */}
                <GallerySearchMenu submitFilters={()=>submitFilters()}/>
            </styled.MenuBox>:null}
            
            {(selectedCharacter&&toggledUI)?<styled.CharMenuBox>
            {/* <div className={styles['menu-container']+' '+styles['char-menu']}> */}
                <GalleryCharacterMenu character={selectedCharacter} isEditable={user_edit_access} closeMenuF={()=>selectCharacter(null)}/>
            </styled.CharMenuBox>:null}
            
            <div className={styles['gallery-container']}>
                <button onClick={toggleUI}>{toggledUI?'<':'>'}</button> <PageSelector totalPages={totalPages} currentPage={currentPage} changePage={changePage}/>
                
                {/* <div className={styles['item-list-container']}> */}
                <ItemCardList items={charList} itemKeyStr='_id' itemTitleStr='shname' itemImageStr='img_url' onItemClickFunction={selectCharacter} getCardDependantColoring={getCharacterCardColoring}/> 
                {/* </div> */}
                 
               
            </div>
        </styled.GalleryPageContainer>
    )
}

// GalleryLogic.propTypes = {}

export default GalleryLogic
