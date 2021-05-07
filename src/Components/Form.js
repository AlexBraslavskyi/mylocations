import React, {useState} from 'react';
import {getInputElementActive} from "../Utils/inputElements";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {actionCategories, actionCategoryName, actionLocations, actionViewStatus} from "./actions/actions";

export const Form = (props) => {
    const dispatch = useDispatch();
    const view = useSelector(state => state.view);
    let [name, setName] = useState(view == "edit" ? props.categoryName : "");
    let [formRef, setFormRef] = useState(null);
    let [error, setError] = useState({errorName: ""});
    const letters = /^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/;
    let newCategories = useSelector(state => state.categories);
    let newLocations = useSelector(state => state.locations);

    function submit(event) {
        event.preventDefault();
        formRef.reset();
        setFormRef(null);
        setError({...error});
        //In case editing category
        if (view == "edit") {
            let index = _.findIndex(newCategories, function (c) {
                return c.name == props.categoryName;
            });
            newCategories[index].name = name;
            newLocations.forEach((l) => l.category == props.categoryName ? l.category = name : l.category);
        }
        //in case adding category
        else {
            newCategories.push({name: name});
        }
        dispatch(actionCategories(newCategories));
        dispatch(actionLocations(newLocations));
        dispatch(actionViewStatus("home"));
        dispatch(actionCategoryName(name));

    }

    //Category name validation
    function handlerName(event) {
        name = event.target.value;
        error = {errorName: ''}
        if (name == "") {
            name = name;
            error = {errorName: 'Please enter name of category'}
        } else if (!name.match(letters)) {
            name = name;
            error = {errorName: 'Name mast content only english letters'}
        } else {
            name = name;
            error = {errorName: ''}
        }
        setName(name);
        setError({...error})
    }

    //Checking errors
    function notErrors() {
        return Object.values(error)
            .reduce((res, field) => {
                return res && !field
            }, true)
    }

    function validate() {
        return notErrors();
    }

    return (
        <div className="row">
            <form className="col s12" id="formValidate" ref={(ref) => formRef = ref}
                  onSubmit={submit}>
                <div className="form-profile">
                    {getInputElementActive('text', 'category', 'Category Name', handlerName, error.errorName, name, 'mode_edit')}
                </div>
                <div className="form-btn">
                    <button type="submit" name="action" className="btn waves-effect waves-light grey"
                            disabled={!validate()}
                    ><i className="material-icons right">send</i>Submit
                    </button>
                </div>
            </form>
            <div className="form-pic">
                {name == "Parks" ? <img className="form-img" src={require('../Style/images/park.png')}/> :
                    name == "Museums" ? <img className="form-img" src={require('../Style/images/mus.png')}/> :
                        name == "Playgrounds" ? <img className="form-img" src={require('../Style/images/play.png')}/> :
                            name == "Shops" ? <img className="form-img" src={require('../Style/images/shop.png')}/> :
                                name == "Malls" ?
                                    <img className="form-img" src={require('../Style/images/mall2.png')}/> :
                                    name == "Restaurants" ?
                                        <img className="form-img" src={require('../Style/images/rest.png')}/> :
                                        <img className="form-img" src={require('../Style/images/loc2.png')}/>}
            </div>
        </div>
    )
}