import React from 'react';
import './Style/style.css';
import {testCategories, testLocations} from "./Config/Config";
import Home from "./Components/Home";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {actionCategories, actionLocations, actionViewStatus} from "./Components/actions/actions";


const App = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state =>
        state.categories);
    const locations = useSelector(state =>
        state.locations);
    const view = useSelector(state =>
        state.view);

    useEffect(() => {
        dispatch(actionCategories(testCategories));
        dispatch(actionLocations(testLocations()));
        dispatch(actionViewStatus("home"));
    }, []);

    return (
        <div className="App">
            <Home categories={categories} locations={locations} view={view}/>
        </div>
    );
}
export default App