import {
     SET_CATEGORIES, SET_LOCATIONS, SET_VIEW
} from "./common";

export const actionCategories= (categories) => {
    return {type: SET_CATEGORIES, payload: categories}
};
export const actionLocations= (locations) => {
    return {type: SET_LOCATIONS, payload: locations}
};
export const actionViewStatus= (view) => {
    return {type: SET_VIEW, payload: view}
};