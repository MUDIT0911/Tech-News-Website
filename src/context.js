import React from 'react'
import {useContext,useReducer,useEffect} from "react"
import reducer from "./reducer"

const API="https://hn.algolia.com/api/v1/search?";
const initialState={
    query:"HTML",
    nbPages:0,
    page:0,
    hits:[],
    isLoading:true,

};


const AppContext=React.createContext()


//to create a provider function 


const AppProvider=({children})=>{


    const [state,dispatch]=useReducer(reducer,initialState);


    





   
    const fetchApiData=async(url)=>{


        dispatch({type:"SET_LOADING"})
        try{

            const res=await fetch(url);
            const data =await res.json();
            console.log(data)
            dispatch({
                type:"GET_STORIES",
                 payload: {
                    hits:data.hits,
                    nbPages:data.nbPages,
                 },
    })

        // extra infromation share krne ke liye payload krte hain 




        }catch(error){
            console.log(error);

        }



    }




    // to remove post 
    const removePost=(post_ID)=>{
        dispatch({type:"REMOVE_POST",payload:post_ID,
        })

    }


    // to search post 

    const searchPost=(searchQuery)=>{
        dispatch({type:"SEARCH_QUERY",payload:searchQuery});
    };


    // pagination

    const getNextPage=()=>{
        dispatch({
            type:"NEXT_PAGE",
        });
    }

    const getPrevPage=()=>{
        dispatch({
            type:"PREV_PAGE",
        });
    }

    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query,state.page])
    
    return (
    <AppContext.Provider value={{...state   ,  removePost, searchPost,getNextPage,getPrevPage}}>

        {children }
    </AppContext.Provider>);
}

// custom hooks creation 

  const useGlobalContext=()=>{
    return useContext(AppContext);
  }




export {AppContext,AppProvider, useGlobalContext };