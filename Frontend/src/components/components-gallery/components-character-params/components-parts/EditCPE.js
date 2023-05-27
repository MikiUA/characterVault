import { useLocalStorage } from "functions-general/hooks";

export function EditCPE({char, changeIsDnD}){
    const [img_url,setImgUrl]=useLocalStorage('editor.img_url',char.img_url||'')
    const [shname,setShname]=useLocalStorage('editor.shname',char.shname||'');
    const [color,setColor]=useLocalStorage('editor.color',char.main_color||'#f0f0f0');
    // useEffect(()=>{console.log(color)},[color]);
    return(
          <div>
            <div>
                View access: 
               <input type='radio' name='view_access' value='private' defaultChecked={char['view_access']==='private'}/>private
               <input type='radio' name='view_access' value='public' defaultChecked={char['view_access']==='public'}/>public
            </div>
            <div>
                Is dnd: 
               <input type='checkbox' name='is_DnD'
               //eslint-disable-next-line
                 disabled={char['is_DnD']==true} defaultChecked={char['is_DnD']==true} defaultValue= {char['is_DnD']==true}
                 onChange={(e)=>{e.target.value=e.target.checked;changeIsDnD();}}/>
                 <span style={{margin:'0'}}>Note: you can not revert your character back from being a DnD once you submit changes</span>
            </div>
            <div>image url  : <input name="img_url" value={img_url} onChange={e=>setImgUrl(e.target.value)} disabled={false}/>  </div>
            <div>ref name   : <input name="refname" defaultValue={char.refname} pattern="^[A-Za-z0-9Є-ї '-]{0,15}$"/>  </div>
            <div>short name : <input name="shname" value={shname} pattern="^([A-Z0-9Є-Я][A-Za-z0-9Є-ї '-]{1,14})$" onChange={e=>setShname(e.target.value)} required/>    </div>
            <div>full name  : <input name="fname" defaultValue={char.fname} pattern="^[A-Z0-9Є-Я][A-Za-z0-9Є-ї '.-]{0,34}$"/>     </div> 
            <div>description : <input name="description" defaultValue={char.description} pattern="^[A-ZЄ-Я][A-Za-z0-9Є-ї '.()-]{1,50}$" required/></div>
            <div>
                Coloring : 
                <select value={color} onChange={e=>setColor(e.target.value)}>
                    <option value=''>other</option>
                    <option value='#f0f0f0'>standart</option>
                    <option value='#ff9999'>red</option>
                    <option value='#fdac4e'>orange</option>
                    <option value='#ffff00'>yellow</option>
                    <option value='#7aff7a'>green</option>
                    <option value='#70ffdd'>greenish blue</option>
                    <option value='#70fdff'>cyan</option>
                    <option value='#94c2ff'>blue</option>
                    <option value='#e1a8ff'>purple</option>
                    <option value='#ffa3e7'>pink</option>
                </select>
                <input type='color' name='main_color' value={color} onChange={e=>setColor(e.target.value)}/>
            </div>
          </div>  )
}
