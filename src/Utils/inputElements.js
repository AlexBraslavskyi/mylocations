import React from "react";
import M from 'materialize-css/dist/js/materialize';
import $ from "jquery";

//Reusable input component
export function getInputElementActive(type, name, label, handler, errorMessage, valueProps, icon, disabled) {
    return <div className="row">
        <div className="input-field col s12">
            <i className="material-icons prefix">{icon}</i>
            <input id={label} required="required" disabled={disabled}
                   className={errorMessage
                       ? "invalid"
                       : "validate"
                   }
                   defaultValue={valueProps}
                   onChange={handler} name={name} type={type}/>
            <label htmlFor={label} className="active"
            >{label}</label>
            <span className="helper-text" data-error={errorMessage} data-success="Perfect!"></span>
        </div>
    </div>
    $(document).ready(function () {
        M.updateTextFields()

    });
}
