import ItemAdder from 'components/components-editableObject/ItemAdder';
import ValueEditable from 'components/components-editableObject/ValueEditable';
import { useEditableObjectFilter } from 'components/components-editableObject/editObjectContext';
import { useState } from 'react';
import styles from '../../styles/CharacterViewer.module.css'

export default function AdditionalParamsView({params,editMode=false}) {  
    const [filter,setFilter]=useState("");
    const filterObject=useEditableObjectFilter()
  return (
    <div className={styles['container']}>
    <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder='find parameterS'/>
    <div className={styles['parameter-container']}>  
      {Object.entries(filterObject({object:params,filter})).map(([label,value])=>{  
        return (
        <div key={label} className={styles['parameter-item']}>
          <div className={styles['item-label']}>
            {label}
          </div>
          <div className={styles['item-value']}>
            <ValueEditable label={label} value={value}/>
          </div>
        </div>)
      })}
      {editMode? <ItemAdder/>:null}
    </div>
    </div>
  )
}
