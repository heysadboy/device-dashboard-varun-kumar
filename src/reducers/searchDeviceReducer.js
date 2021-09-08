import types from '../actions/types';

const searchReducer = (state = "", action) => {
    switch(action.type) {
        case types.search_devices: return action.payload;
        default: return state;
    }
};

export default searchReducer;