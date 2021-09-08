import types from "../actions/types";

const deviceUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.loading_update_message: return action.payload;
        case types.update_device_status: return action.payload;
        case types.reset_status_message: return action.payload;
        default: return state;
    }
};

export default deviceUpdateReducer;