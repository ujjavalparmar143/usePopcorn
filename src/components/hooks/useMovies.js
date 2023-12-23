import { useEffect, useState } from "react";


const API_KEY = "ef3b4e53";

export function useMovies( query) {

    const [movies, setMovies] = useState([]);
    const [numResult, setNumResult] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {


        const controller = new AbortController();

        async function getData() {

            try {

                setError(() => "");
                setLoading(() => true);

                const responce = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=1`,
                    { signal: controller.signal }
                );

                if (!responce.ok)
                    throw new Error("Something  wan't wrong while fething data!");

                const data = await responce.json();

                if (data.Response === "True") {
                    setError(() => "");
                    setMovies(() => data.Search);
                    setNumResult(() => data.totalResults);
                    setLoading(() => false);
                } else {
                    setError(() => "Not Found");
                    setNumResult(() => 0);
                }
            } catch (err) {
                if (err.message === 'The user aborted a request.') return;
                setError(() => "Something  wan't wrong while fething data!");
                setNumResult(() => 0);
            } finally {
                setLoading(() => false);
            }
        }


        if (query.length > 2) getData();

        if (query.length < 2) {
            setMovies(() => []);
            setNumResult(() => 0);
            return;
        }

        return (() => controller.abort())

    }, [query]);

    return [ movies, numResult, loading, error ];

}