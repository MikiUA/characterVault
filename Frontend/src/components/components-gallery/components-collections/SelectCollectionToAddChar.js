import { useUser } from 'context-global/userContext'
import React, { useRef } from 'react'

export default function SelectCollectionToAddChar({charID}) {
    const user=useUser();
    const collectionList=useRef((user && user['availible_collections'])||[]);
    // const [filter,setfilter]=useState();
    //if availible collection list length >10 add a filter
    //if availible collection list length >30 add a page selector
    //TODO

  return (
    <div>
        select collection
        {collectionList.current.map(item=>{
            console.log(item);
            return <div key={item.id}>{item.id}</div>
        })}
    </div>
  )
}
