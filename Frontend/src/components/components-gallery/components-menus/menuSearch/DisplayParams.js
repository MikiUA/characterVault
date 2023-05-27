import React from 'react'
import styles from '../../styles/GallerySearchMenu.module.css'

function MenuDiv({children}){
    return(
        <div className={styles['menu-div']}>
            {children}
        </div>
    )
}
export default function DisplayParams() {
  return (
    <div name='display params'>
            <h3>Display Params</h3>

            <MenuDiv>
                <label>card size</label>
                <div>
                <input type='radio' name="cardSize" value='wide'/>wide
                <input type='radio' name="cardSize" value='thin' defaultChecked/>thin
                </div>
            </MenuDiv>
            <MenuDiv>
                <label>Coloring</label>
                <div>
                <input type='radio' name="coloring" value={true} defaultChecked/>colorful
                <input type='radio' name="coloring" value={false}/>modest
                </div>
            </MenuDiv>
            </div>
  )
}
