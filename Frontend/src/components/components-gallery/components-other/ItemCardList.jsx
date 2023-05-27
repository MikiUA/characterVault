import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ItemCard from './ItemCard'
import styles from '../styles/ItemCardList.module.css'

// const defaultCardStyle={}
const defaults={
    cardColoring:{
        borderColor:'',
        backgroundColor:'',
        fontColor:''
    },
    cardDependantColoring:(item)=>({
        borderColor:'',
        backgroundColor:'',
        fontColor:''
    }),
    onClickFunction:()=>{}
}

function ItemCardList({
    items=[],
    itemKeyStr='',
    itemTitleStr='',
    itemImageStr='',
    onItemClickFunction=defaults.onClickFunction,
    cardStyleClass,
    getCardDependantColoring=defaults.cardDependantColoring,
}) {
    const [activeItem,setActiveItem]=useState(null);

    if (!Array.isArray(items)) {
        console.log('invalid prop passed to item list')
        return <></>
    }
    // if (!cardStyle) cardStyle=defaultCardStyle;
    return (
        <div className={styles['container']}>
            {items.map(item=>{
                const coloring=getCardDependantColoring(item);
                return (
                <div name="item-card" key={item[itemKeyStr]} onClick={()=>{setActiveItem(item[itemKeyStr]);onItemClickFunction(item)}}>
                <ItemCard title={item[itemTitleStr]} 
                    imageUrl={item[itemImageStr]} 
                    isActive={activeItem===item[itemKeyStr]} 
                    styleClass={cardStyleClass}
                    coloring={coloring}
                    />
                </div>
            )})}
        </div>
    )
}

ItemCardList.propTypes = {
    items:PropTypes.array
}

export default ItemCardList

