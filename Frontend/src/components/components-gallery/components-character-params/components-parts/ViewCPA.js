function OtherParams({paramObj,styles}){
    return (
    <div className={styles['parameter-container']}>
      {Object.entries(paramObj).map(([label,value])=>{  
        if (typeof(value)!=='string') return ''
        return (
        <div key={label} className={styles['parameter-item']}>
          <div className={styles['item-label']}>
            {label}
          </div>
          <div className={styles['item-value']}>
            {value}
          </div>
        </div>)
      })}
    </div>
  )}