'use client'
  
import { createContext, useState } from "react";

export const SearchBarContext = createContext();

export default function SearchBarProvider ({ children }) {
    const [search, setSearch] = useState("");
    return (
        <SearchBarContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchBarContext.Provider>
    );
};
