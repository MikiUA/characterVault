export default function GallerySearchMenu({reload_gallery}){
    return <>
        Search menu
        <button onClick={()=>{reload_gallery()}}>reload gallery</button>
    </>
}