import React from 'react';

const Button = (props)=> {
    return (
    <button value={props.value ? props.value : null} onClick={props.onClick}>
        {props.children}
    </button>
    );
}

export default Button;