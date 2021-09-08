import types from "../actions/types";

const deviceCountReducer = (state = { active: 0, inactive: 0 }, action) => {
    switch (action.type) {
        case types.set_device_count: return { ...state, ...action.payload };
        default: return state;
    }
};

export default deviceCountReducer;