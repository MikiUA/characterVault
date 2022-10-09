import './styles/CharCard.css'
// function selectedParam(){
//     if(selectedParam) return 0;
// }
let template_image_source="/undefined_template.jpg"
export default function CharacterCard({selected_char}){
    if (!selected_char || selected_char===undefined) return
    // const selectedParam="";
    return (<div className="card-container">
        <div className='card-image-container'>
            {/* {selected_char["refname"]} 
            <br/>image */}
            {(!selected_char["img_url"] || selected_char["img_url"]==='')
                ?<img className='card-image' src={template_image_source}></img>
                :<img className='card-image' src={selected_char["img_url"]}></img>}
        </div>
        <div className='short-name'>
            {selected_char["shname"]}
        </div>
        {/* <div className='selected-param'>
        selected_char[selectedParam]
        </div> */}
    </div>)
}