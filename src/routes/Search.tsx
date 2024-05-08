// Search.tsx
// Search.tsx
import { Stack, TextField } from "@mui/material";

import "./Search.scss";
import { useSearch } from "../hooks/useSearch";



const Search = () => {
    const { setSearchTerm } = useSearch(); // Access the search term setter from the context

    return (
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
        </Stack>
    );
};

export default Search;













