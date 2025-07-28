import React,{useCallback, useEffect, useState} from 'react'
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
    user_edit_access=false, //if user is in personal collection or "mychars" it is true to edit directly fom side menu (TODO:isn't there like separate thing to check?) or collection info
    availibleCharacterFields={}, //again usefull only in personal collection and maybe an array or objects?TODO
    updateItemsFunction=function(filter={}){
        return new Promise(resolve=>resolve({totalItems:0,items:[]}))
    }}) //so its like different pages send different requests to different api endpoints with filter object
    {
    const [itemList,setItemList]=useState([]); //complete list of either characters or collections on this page
    
    const [toggledUI,setToggledUI] = useState(true); //visible search/filter/sort side menu 
    const toggleUI = useCallback(()=>setToggledUI(prevValue=>!prevValue),[setToggledUI])
    // function toggleUI(){
    //     setToggledUI(prevValue=>!prevValue)
    // }TODO delete once callback works
    const [selectedItem,setSelectedItem]=useState(null); //current side menu and shadow around item
    
    const [filter,setFilter] = useState({itemsPerPage:50,page:1});
    // const [searchParams,setSearchParams]=useSearchParams();//should like translate query into current filter
    const [totalPages,setTotalPages]=useState(1); //{totalItems:0,items:[]})
    const {showErrorOverlay}=useShowOverlay();

    const updateItemList=useCallback(()=>{
        updateItemsFunction(filter).then(
            response=>{
                setTotalPages(Math.ceil(response.totalItems/filter.itemsPerPage));
                setItemList(response.items);
            }
        ).catch(error=>{console.log(error); showErrorOverlay(error)});
    },[updateItemsFunction, showErrorOverlay,filter]);

    useEffect(()=>{
        // console.log('hi');
        //somehow get those search params into filter
        setFilter({
            itemsPerPage:50,
            page:1
        })
        //eslint-disable-next-line
    },[])
    useEffect(()=>{
        updateItemList();
        //eslint-disable-next-line
    },[filter]);

    const submitFilters = useCallback((newFilter={})=>{
        newFilter.page=filter.page;
        if (typeof(newFilter.itemsPerPage)!=='number') newFilter.itemsPerPage=50;
        setFilter(newFilter);
    },[setFilter,filter]);

    const changePage = useCallback((newPage)=>{
        let newFilter=filter;
        newFilter.page=newPage
        setFilter(newFilter)
    },[setFilter,filter])

    const selectItem=useCallback((card=null)=>{setSelectedItem(card)},[setSelectedItem])
  
    const getCardColoring=useCallback((char)=>{
        let defaultColors={
            borderColor:'black',
            backgroundColor:'white',
            fontColor:'black'
        }
        if (typeof(char)!=='object') return defaultColors//showErrorOverlay({message:'internal error in getting char colors'});
        defaultColors.backgroundColor=char.main_color||defaultColors.backgroundColor;
        return defaultColors;
    },[])

    

    // const [isLoading,setIsLoading]=useState(false);
    // const [error,setError]=useState(null);

    return (
        <styled.GalleryPageContainer>
        {/* <div className={styles['GalleryPage-container']}> */}
            {toggledUI?<styled.MenuBox>
            {/* <div className={styles['menu-container']}> */}
                <GallerySearchMenu submitFilters={()=>submitFilters()}/>
            </styled.MenuBox>:null}
            
            {(selectedItem&&toggledUI)?<styled.CharMenuBox>
            {/* <div className={styles['menu-container']+' '+styles['char-menu']}> */}
                <GalleryCharacterMenu character={selectedItem} isEditable={user_edit_access} closeMenuF={()=>selectItem(null)}/>
            </styled.CharMenuBox>:null}
            
            <div className={styles['gallery-container']}>
                <button onClick={toggleUI}>{toggledUI?'<':'>'}</button> 
                <PageSelector totalPages={totalPages} currentPage={filter.page} changePage={changePage}/>
                
                {/* <div className={styles['item-list-container']}> */}
                <ItemCardList items={itemList} itemKeyStr='_id' itemTitleStr='shname' itemImageStr='img_url' onItemClickFunction={selectItem} getCardDependantColoring={getCardColoring}/> 
                {/* </div> */}
            </div>
        </styled.GalleryPageContainer>
    )
}

// GalleryLogic.propTypes = {}

export default GalleryLogic
