import React from 'react';
import classNames from 'classnames';


export const Checkbox = ({onChange, label, checked}) => {

    const className = classNames("mm-checkbox-box", {"checked":checked}); 
    return(
        <div className="mm-checkbox">
        <label className="form-check-label">
            {label}
        </label>
        <div className={className} type="checkbox" onClick={onChange} />
        </div>
    );
}