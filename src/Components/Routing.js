import React, {useState} from "react";
import Table from "./Table";
import {Form} from "./Form";
import {useSelector} from "react-redux";
import DetailTable from "./DetailTable";

//Component to manage tables/form view
export default function Routing(props) {
    const view = useSelector(state => state.view);
    const locations = useSelector(state => state.locations);
    const categories = useSelector(state => state.categories);
    const categoryName = view == "add" || props.categoryItems.length == 0 ? "" : props.categoryItems[0].category;

    return (
        <div className="location-details">
            <h3 className="location-title">{view == "locations" ? "- All Locations -" : view == "categories" ? "- Categories -"
                : categoryName == "" ? "- New category -" : categoryName ? "- Category:" + categoryName + " -" : null
            }</h3>
            <div className="location-table">
                {view == "view" ? <Table categoryItems={props.categoryItems}/> : null}
            </div>
            <div className="form-content">
                {view == "edit" || view == "add" ?
                    <Form fnChangeState={props.fnChangeState} categoryName={props.categoryName}/> : null}
            </div>
            <div className="location-table">
                {view == "locations" ? <Table categoryItems={locations}/> : null}
            </div>
            <div className="location-table">
                {view == "categories" ? <DetailTable categoryItems={categories} locations={locations}/> : null}
            </div>
        </div>

    )
}