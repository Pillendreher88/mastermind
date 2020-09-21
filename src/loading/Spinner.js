import React from 'react';

export const Spinner = ({size, classNames}) => {
    const style = { height: size, width: size, };

    return(
        <div className ="mm-center-vertically-horizontally">
            <div className ={"spinner-border-sm spinner-border " + classNames} style={style} role="status">
                <span className ="sr-only">Loading...</span>
            </div>
            <span >Loading...</span>
        </div>
    );
}