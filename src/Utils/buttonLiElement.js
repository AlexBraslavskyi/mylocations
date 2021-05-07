import React from "react";
import M from 'materialize-css/dist/js/materialize';
import $ from "jquery";

//Reusable button component
export function getButtonLiElement(id, title, handler, iconName, color) {
    return <li>
        <button id={id} className={"waves-effect waves-light btn "+color}
                onClick={handler}>
            <i className="material-icons">{iconName}</i>
            {title}
        </button>
    </li>
}
