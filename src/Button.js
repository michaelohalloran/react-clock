import React from 'react';

const Button = (props)=> {
    // console.log('btn values ', props);
    return (
    <button
        className="btns"
        value={props.value} 
        onClick={props.onClick}
    >
        {props.value ? props.value : props.children}
    </button>
    );
}

export default Button;