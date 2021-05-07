import {
     SET_CATEGORIES, SET_LOCATIONS, SET_VIEW, SET_CATEGORY_NAME
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
export const actionCategoryName= (category_name) => {
    return {type: SET_CATEGORY_NAME, payload: category_name}
};