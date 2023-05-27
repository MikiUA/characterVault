import React from 'react'

export default function PageSelector({totalPages=0,currentPage,changePage}) {
  if(totalPages>1000) console.log(currentPage);
  
    const PageBtn=({int})=>{
        return <button key={int} onClick={()=>changePage(int)}>{int}</button>
    }
    
    function BtnList(){
      let char_JSX_array=[];
      
      for (let i=1;i<=totalPages;i++){

        char_JSX_array.push(<PageBtn key={i} int={i}/>)
      }
      return char_JSX_array;
    }; //this function makes all diplayed
  return (
    <> 
      {/* <PageBtn int={1}/> */}
      Select page: <BtnList/>
    </>
  )
}
