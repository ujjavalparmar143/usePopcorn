import { useEffect } from "react";

export function useKey(key, callback) {



    useEffect(() => {

        const keyHandler = (e) => {

            if (e.code.toLowerCase() === key.toLowerCase()) {
            callback();
            }
        }

        document.addEventListener('keydown', keyHandler);

        return (() => document.removeEventListener('keydown', keyHandler))

    }, []);

}