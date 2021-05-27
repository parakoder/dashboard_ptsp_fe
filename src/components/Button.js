import React from 'react';

const Button = ({ children, className, ...rest }) => {
    return (
        <div {...rest} className={className}>
            {children}
        </div>
    );
};

export default Button;
