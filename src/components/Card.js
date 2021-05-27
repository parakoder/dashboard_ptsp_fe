import React from 'react';
import '../styles/global.scss';

const Card = ({ children, className, ...rest }) => {
    return (
        <div {...rest} className={className}>
            {children}
        </div>
    );
};

export default Card;
