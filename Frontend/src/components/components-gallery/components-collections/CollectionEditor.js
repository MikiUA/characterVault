import React from 'react'

export default function CollectionEditor({collection,handleSubmit}) {
  return (
    <form onSubmit={e=>e.preventDefault()}>
      <div>
          Collection Type: 
         <input type='radio' name='type' value='collection' defaultChecked/>Simple collection
         <input type='radio' name='type' value='workflow' disabled/>workflow
      </div>
      <div>
          Is dnd: 
         <input type='checkbox' name='is_DnD'
         //eslint-disable-next-line
           disabled={char['is_DnD']==true} defaultChecked={false} defaultValue={false}
           onChange={(e)=>{e.target.value=e.target.checked;}}/>
      </div>
      <div>image url  : <input />  </div>
      <div>Collection name   : <input pattern="^[A-Za-z0-9Є-ї '-]{0,30}$"/>  </div>
      <div>description : <input pattern="^[A-ZЄ-Я][A-Za-z0-9Є-ї '.()-]{1,50}$" required/></div>
      <button disabled>submit</button>
   </form> 
  )
}
