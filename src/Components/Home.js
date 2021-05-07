import React, {useEffect, useState} from "react";
import Routing from "./Routing";
import {actionCategories, actionCategoryName, actionViewStatus} from "./actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {AppBar} from "@material-ui/core";
import {getButtonLiElement} from "../Utils/buttonLiElement";

export default function Home(props) {
    const dispatch = useDispatch();
    const view = useSelector(state => state.view);
    const [categoryItems, setCategoryItems] = useState([]);
    const categories = useSelector(state => state.categories);
    const locations = useSelector(state => state.locations);
    const categoryName = useSelector(state => state.categoryName);
    //To get category name and list specific locations
    const getCategory = (name) => {
        dispatch(actionViewStatus("list"))
        dispatch(actionCategoryName(name))
        setCategoryItems(locations.filter(location => location.category == name));
    }

    //Mapping list of categories
    const items = categories.map(((category, index) => {
        return (
            <ul className="wrapper" key={category.name}>
                <li>
                    <button id="content-btn" className="waves-effect waves-light btn grey"
                            onClick={() => getCategory(category.name)}>
                        <div className="card-content">
                            <span className="card-title">{category.name}</span>
                        </div>
                    </button>
                </li>
            </ul>
        )
    }))

    //Handlers to view changing

    const deleteHandler = (name) => {
        dispatch(actionViewStatus("delete"))
        if (window.confirm(`You are going to delete category ${name}`)) {
            dispatch(actionCategories(categories.filter(category => category.name != name)))
        }
        viewHandler("home");


    }
    const viewHandler = (view) => {
        if(view=="home"){
            dispatch(actionCategoryName(""));
        }
        dispatch(actionViewStatus(view));
    }

    return (<div>
            <nav className="nav-main">
                <div className="nav-wrapper">
                    <ul className="button-group">
                        {getButtonLiElement("category-btn-back", "home", () => viewHandler("home"), "home", "yellow")}
                        {view == "home" ? getButtonLiElement("category-btn-back", "new Category", () => viewHandler("add"), "add_circle_outline", "grey") : null}
                        {view == "list" ? getButtonLiElement("category-btn-back", "edit", () => viewHandler("edit"), "edit", "grey") : null}
                        {view == "list" ? getButtonLiElement("category-btn-back", "view", () => viewHandler("view"), "view_list", "grey") : null}
                        {view == "list" ? getButtonLiElement("category-btn-back", "delete", () => deleteHandler(categoryName), "delete_forever", "grey") : null}
                    </ul>
                </div>
                <div className="nav-logo">
                    <img className="nav-img"
                         src={require('../Style/images/logo.png')}/></div>
            </nav>
            {view == "home" || view == "list" ? <div className="main-content">
                    <h2 className="category-title"> {categoryName?"- Category : " +categoryName+" -":"- Home -"} </h2>
                    <div className="category-items">
                        {items}
                    </div>
                    <AppBar position='sticky' className="app-bar">
                        <div className="content-logo">
                            <img className="content-img"
                                 src={require('../Style/images/loc2.png')}/>
                        </div>
                        {view == "home" || view == "list" ? <ul className="btn-group">
                            {getButtonLiElement("category-btn", "categories", () => viewHandler("categories"), "list", "grey")}
                            {getButtonLiElement("category-btn", "all locations", () => viewHandler("locations"), "location_on", "grey")}
                        </ul> : null}
                    </AppBar>
                </div> :
                <div>
                    <Routing categoryItems={categoryItems} categoryName={categoryName}
                    />
                </div>}
        </div>
    )
}