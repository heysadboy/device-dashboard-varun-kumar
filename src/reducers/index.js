import { combineReducers } from 'redux';
import deviceReducer from './deviceReducer';
import deviceUpdateReducer from './deviceUpdateReducer';
import searchDeviceReducer from './searchDeviceReducer';
import statusReducer from './statusReducer';
import deviceCountReducer from './deviceCountReducer';

export default combineReducers({
    devices: deviceReducer,
    device_update: deviceUpdateReducer,
    status: statusReducer,
    search_device: searchDeviceReducer,
    device_count: deviceCountReducer
});