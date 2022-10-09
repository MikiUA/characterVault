import './styles/CharCard.css'
// function selectedParam(){
//     if(selectedParam) return 0;
// }
export default function CollectionCard({collectionName}){
    // const selectedParam="";

    return (<div className="card-container collection-card-container">
        <div className='card-image'>
            
            <br/>image
        </div>
        <div className='short-name'>
            {collectionName}
        </div>
        {/* <div className='selected-param'>
        selected_char[selectedParam]
        </div> */}
    </div>)
}