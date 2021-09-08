import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDeviceStatus } from '../actions';

const mapDispatchToProps = (dispatch) => ({
    updateDeviceStatus: bindActionCreators(updateDeviceStatus, dispatch)
});

const DeviceStatus = ({ status, name, updateDeviceStatus }) => {
    const [currentStatus, setCurrentStatus] = useState(status);

    const deviceStatusChange = (e) => {
        updateDeviceStatus(e.target.checked, name, setCurrentStatus);
    }

    return (
        <React.Fragment>
            <div className="right floated">
                <a className={`ui ${currentStatus ? 'green' : 'red'} circular tiny label`}></a>
            </div>
            <div className="ui toggle checkbox">
                <input type="checkbox" name="status" checked={currentStatus} onChange={deviceStatusChange} />
                <label></label>
            </div>
        </React.Fragment>
    );
};

export default connect(null, mapDispatchToProps)(DeviceStatus);