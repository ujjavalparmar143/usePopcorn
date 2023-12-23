import { useEffect, useState } from "react";



export function useLocalWatched(){

    const [watched, setWatched] = useState(function () {
        const localStore = localStorage.getItem("watched");
        return localStore ? JSON.parse(localStore) : [];
      });
    
    
      useEffect(() => {
    
        localStorage.setItem("watched", JSON.stringify([...watched]));
    
      }, [watched]);
    
      return  [ watched, setWatched ];

}
