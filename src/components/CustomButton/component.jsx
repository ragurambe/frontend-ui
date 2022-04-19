import React from "react";

export default function CustomButton(props) {
    return (
        <button
            className={`willmore-btn button2 ${props.class}`}
            type={props.type}
            onClick={props.onClick}
            style={props.style}
        >
            {props.label}
        </button>
    )
}
