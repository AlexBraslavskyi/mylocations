import {
    SET_VIEW, SET_LOCATIONS, SET_CATEGORIES
} from '../actions/common'
const initState = {
    categories: [],
    locations:[],
    view:""
}

const Reducers =
    (state = initState, action) => {

        if (action.type === SET_CATEGORIES) {
            return {
                ...state,
                categories: action.payload.slice(0),
            }
        }  if (action.type === SET_LOCATIONS) {
            return {
                ...state,
                locations: action.payload.slice(0),
            }
        } if (action.type === SET_VIEW) {
            return {
                ...state,
                view: action.payload
            }
        }
        else {
            return state
        }
    }

export default Reducers;