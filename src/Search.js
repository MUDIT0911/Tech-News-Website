import React from 'react'
import { useGlobalContext } from './context';

const Search = () => {
  const {query,searchPost}=useGlobalContext();
  return (
    <>

    <h1>   TECH NEWS WEBSITE</h1>
    <form  onSubmit={(e)=>e.preventDefault()}>

      <div>
        <input type="text"  value={query} onChange={(e)=>
        searchPost(e.target.value)} placeholder='Search here ' />
      </div>
    </form>



      
    </>
  )
}

export default Search;
