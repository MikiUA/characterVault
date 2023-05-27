import styles from './styles/Overlay.module.css'

export function EmptyOverlay({children}){
    <div className={styles['overlay-container']}>
    <div className={styles['overlay']}> 
        {children}
    </div>
    </div>
}

export function ClosableOverlay({children,closeFunc=function(){},title}){
    return (
    <div className={styles['overlay-container']}>
        <div className={styles['overlay']+' '+styles['bordered']}>
            <div className={styles['overlay-title']}>
                <div className={styles['close-button']} onClick={closeFunc}>X</div>
                {title?title:''}
            </div>
            <div className={styles['overlay-children']}>
                {children}
            </div>
        </div>
    </div>
)}

export function ErrorOverlay({error,closeOverlay}){
    console.log(error);
    const errTitle=()=>{
        let status=error && error.status
        if (!status || (typeof(status)!=='number' && typeof(status)!=='string')) return 'Error'
        if (status===-1) return 'Internal Error'
        return `Error (${error.status})`
      }
    
    if (error && typeof(error.message)!=='string') error.message=null
    return (
    <ClosableOverlay title={errTitle()} closeFunc={closeOverlay}>
        <p style={{margin: '0.5em 1em'}}>
        {(error && error.message) || 'internal error'}
        </p>
    </ClosableOverlay>
)}
