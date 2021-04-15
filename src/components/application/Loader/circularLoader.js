import React from 'react';
import './circularLoader.css';
export default function () {
    return (
        <div className="circularLoadercontainer">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
    )
}