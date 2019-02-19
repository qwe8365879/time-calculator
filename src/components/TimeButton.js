import React from 'react';
import './TimeButton.css';

export const TimeButton = props => (
    <div className={`time-button-wrapper`}
         onClick={() => props.handleClick(props.children)}
    >
        {props.children}
    </div>
);
