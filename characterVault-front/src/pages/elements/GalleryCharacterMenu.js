import "./styles/GalleryCharMenu.css"
//most of class names will start with GCM - Gallery Character Menu



export default function GalleryCharacterMenu({char,unselectMenu}){
    if (!char) return;
    else console.log(char);
    const hideMenu=()=>{
        // console.log(unselectMenu);
        unselectMenu("");
    }
    function menuItemJsx(key, itemType){
        if(!key) return;
        //now item type can be 
        //essential params which do not have any items within items,
        //suggested params which are displayed first
        //additional params where there can be any amount of items within it
        //here the "suggested_params" or "additional_params are passed"
        
        // await Promise.delay(100);
        // (itemType)?console.log("item type:",itemType,";    params:",char[itemType]):  console.log(key,":",char[key]);


        const item_label=key;
        let item_value;
        if (itemType && char[itemType] && char[itemType]!==undefined){
            item_value= char[itemType][key];
        }
        else item_value=char[key];
        if (!item_value || item_value==undefined) return;
        // console.log(item_label,item_value);
        return (
        <div className="gcm-menu-item">
            
            <div className="gcm-item-label"> {item_label}</div>
            <div className="gcm-item-value"> {item_value}</div>
            
        </div>
        )
    }    

    const menuItemArray=[
        menuItemJsx("description"),
        menuItemJsx("author"),
        menuItemJsx("date_created"),
        menuItemJsx("date_modified"),
        menuItemJsx("voice_actor","additional_params"),
        menuItemJsx("group","additional_params"),
        // menuItemJsx("gimmik","additional_params")
    ]


    return (
    <div className="">
        <button onClick={()=>hideMenu()}>hide menu</button>
        {/* <br/> */}
        <h3 className="gcm-menu-item">{(char["fname"]!==undefined)?char["fname"]:char["shname"]}</h3>

        {menuItemArray}

    </div>    
)}