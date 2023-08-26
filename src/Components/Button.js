import React from 'react'

const Button = ({ color , onClick , showAdd }) => {
    
    return (
        <button style={ { backgroundColor : color }  } onClick={onClick} className="btn">
            {showAdd ? "Close" : "Add"}
        </button>
    )
}

export default Button
