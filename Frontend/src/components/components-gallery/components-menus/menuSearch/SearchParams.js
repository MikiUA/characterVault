import React from 'react'
import styles from '../../styles/GallerySearchMenu.module.css'

function MenuDiv({children}){
    return(
        <div className={styles['menu-div']}>
            {children}
        </div>
    )
}
export default function SearchParams() {
  return (
    <div name='search params'>
    <h3>Search Params</h3>
    <MenuDiv>
        <input name='refname' placeholder="find by refname"/>
    </MenuDiv>
    <MenuDiv>
        <input type='checkbox'  name="withImage"/>only with image
    </MenuDiv>
    <MenuDiv>
        <input type='checkbox' name="isDnD"/>dnd only
    </MenuDiv>
    <MenuDiv>
        <input name='sortBy' placeholder="sort By"/>
        <div>
        <input type='radio' name="sortOrder" value='1' defaultChecked/>asc
        <input type='radio' name="sortOrder" value='-1'/>desc
        </div>
    </MenuDiv>
    </div>
    
  )
}
