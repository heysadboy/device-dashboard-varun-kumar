import Relayr from '../api/Relayr';
import types from './types';

const appOkAction = { type: types.app_ok, payload: "OK" };
const appErrorAction = { type: types.app_error, payload: "ERROR" };
const appLoadingAction = { type: types.app_loading, payload: "LOADING" };

//Fetches devices from the API
export const getDevices = () => async (dispatch) => {
    dispatch(appLoadingAction);
    try {
        const response = await Relayr.get('/devices');
        if (response.status === 200) {
            const setDeviceAction = { type: types.set_device_data, payload: response.data.data };
            dispatch(setDeviceAction);
            dispatch(appOkAction);

            const device_count = { active: 0, inactive: 0 };
            device_count.active = response.data.data.filter((obj) => obj.active === true).length;
            device_count.inactive = response.data.data.filter((obj) => obj.active === false).length;

            dispatch(setDeviceCount(device_count));
        }
    }
    catch {
        dispatch(appErrorAction);
    }
}

//Updates status of the device
export const updateDeviceStatus = (active = null, name = null, setCurrentStatus) => async (dispatch, getState) => {
    if (active == null && name == null) {
        const resetDeviceStatusAction = { type: types.reset_status_message, payload: {} };
        dispatch(resetDeviceStatusAction);
    }
    else {
        const devices = getState().devices;
        try {
            const loadingDeviceStatusAction = { type: types.loading_update_message, payload: { active: active, name: name, result: 'LOADING' } };
            dispatch(loadingDeviceStatusAction);

            const response = await Relayr.patch(`/devices/${name}?active=${active}`);

            if (response.status === 200) {
                const updateDeviceStatusAction = { type: types.update_device_status, payload: { active: active, name: name, result: 'SUCCESSFUL' } };
                dispatch(updateDeviceStatusAction);

                //Updating the list devices stored in the state
                const index = devices.findIndex((device => device.name == name));
                const deviceToUpdate = devices[index];
                deviceToUpdate.active = active;
                deviceToUpdate.name = name;
                devices[index] = deviceToUpdate;
                const updatedDeviceList = devices;
                const setDeviceAction = { type: types.set_device_data, payload: updatedDeviceList };
                dispatch(setDeviceAction);

                setCurrentStatus(active);

                //Update device count
                const device_count = getState().device_count;
                if (active) {
                    device_count.active += 1;
                    device_count.inactive -= 1;
                }
                else {
                    device_count.active -= 1;
                    device_count.inactive += 1;
                }
                dispatch(setDeviceCount(device_count));
            }
        }
        catch {
            const updateDeviceStatusAction = { type: types.update_device_status, payload: { active: active, name: name, result: 'UNSUCCESSFUL' } };
            dispatch(updateDeviceStatusAction);
        }
    }
}

//Updates search word from the navigation bar
export const searchWord = (device_name) => async (dispatch) => {
    const setSearchDeviceAction = { type: types.search_devices, payload: device_name };
    dispatch(setSearchDeviceAction);
}

//Set total number of active and inactive devices
export const setDeviceCount = (device_count) => async (dispatch) => {
    const setDeviceCountAction = { type: types.set_device_count, payload: device_count };
    dispatch(setDeviceCountAction);
}