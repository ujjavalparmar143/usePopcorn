import React from 'react'

const NumResults = ({ numResult }) => {
return (
        <p className="num-results">
            Found <strong>{numResult}</strong> results
        </p>
    )
}

export default NumResults