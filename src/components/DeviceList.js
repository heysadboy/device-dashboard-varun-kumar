import React from 'react';
import DeviceCard from './DeviceCard';
import { connect } from 'react-redux';
import Status from './Status';
import Loader from './Loader';
import { bindActionCreators } from 'redux';
import { setDeviceCount } from '../actions';

const mapStateToProps = (state) => ({
    devices: state.devices,
    device_update: state.device_update,
    search_device: state.search_device
});

const DeviceList = ({ devices, search_device, device_update }) => {
    const renderedDeviceList = devices.map((device) => {
        if (device.name.startsWith(search_device)) {

            return (<DeviceCard key={device.name} device={device} />);
        } else if (search_device == "") {
            return (<DeviceCard key={device.name} device={device} />);
        }
    });

    //Display the status on updating
    const status = device_update.active ? "active" : "inactive";
    const getStatus = () => {
        if (device_update.result == "LOADING") {
            return (<Loader message={`Updating ${device_update.name} status to ${status}.`} />);
        } else if (device_update.result == "SUCCESSFUL") {
            return (<Status message={`Set ${device_update.name} to ${status} successfully`} status_type="positive" />);
        }
        else if (device_update.result == "UNSUCCESSFUL") {
            return (<Status message={`Unable to set ${device_update.name} to ${status}`} status_type="negative" />);
        }
        else {
            return null;
        }
    }

    //Display list of devices
    return (
        <React.Fragment>
            {getStatus()}
            <div className="ui three stackable cards">{renderedDeviceList}</div>
        </React.Fragment>
    );
};

export default connect(mapStateToProps)(DeviceList);