import types from "../actions/types";

const statusReducer = (state = "LOADING", action) => {
    switch (action.type) {
        case types.app_error: return action.payload;
        case types.app_ok: return action.payload;
        case types.app_loading: return action.payload;
        default: return state;
    }
};

export default statusReducer;