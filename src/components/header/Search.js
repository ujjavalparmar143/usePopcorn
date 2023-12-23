import React, { useEffect, useRef } from 'react'
import { useKey } from '../hooks/useKey';

const Search = ({ query, setQuery }) => {

    const inputEl = useRef(null);

    useEffect(()=> inputEl.current.focus());

    useKey( 'Enter', function(){
        inputEl.current.focus();
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(()=>e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search