// Search.tsx
// Search.tsx
import { Stack, TextField } from "@mui/material";

import "./Search.scss";
import { useSearch } from "../hooks/useSearch";
import { FaSearch } from "react-icons/fa";



const Search = () => {
    const { setSearchTerm } = useSearch(); // Access the search term setter from the context

    return (


<div className='flex items-center justify-center  bg-gradient-to-br'>
    <form action="" className="relative mx-auto flex">
        <input onChange={(e) => {
                    setSearchTerm(e.currentTarget.value); // Update the search term in the context
                }} type="search" className="text-xs peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent  pr-6 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-taupeGray focus:px-3"  placeholder="Typing..."/>
        <button className="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 bg-slate-300 rounded-lg peer-focus:relative peer-focus:rounded-l-none">
            <FaSearch className="text-slate-600" />
        </button>
    </form>
</div>


        

/* 
        <Stack className="search-container">
            <TextField
                className="search-input dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                    setSearchTerm(e.currentTarget.value); // Update the search term in the context
                }}
                variant="outlined"
                label="Search"
                required
            />
        </Stack> */
    );
};

export default Search;













