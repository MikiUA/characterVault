import DisplayParams from "./menuSearch/DisplayParams";
import SearchParams from "./menuSearch/SearchParams";
import styles from '../styles/GallerySearchMenu.module.css'


export default function GallerySearchMenu({submitFilters=function(){}}){

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
        }
        data.forEach((value,key)=>{
            body[key]=value;
        })
        console.log(body);
        submitFilters();
      };

    return (
        <div className={styles['menu-container']}>
        <form onSubmit={handleSubmit}>
            <SearchParams/> 
            <button type="submit">Search!</button>
        </form>
        <DisplayParams/>
        </div>
)}

