export default function ViewCPE() {
  return (
    <div> 
        <div className={styles['title-name']}>{character.fname?character.fname:character.shname}</div>
        <div className={styles['title-refname']}>{character.refname}</div>
    </div>
  )
}
