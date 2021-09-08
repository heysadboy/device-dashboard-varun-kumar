import types from "../actions/types";

const deviceReducer = (state = [], action) => {
    switch (action.type) {
        case types.set_device_data: return action.payload;
        default: return state;
    }
}

export default deviceReducer;