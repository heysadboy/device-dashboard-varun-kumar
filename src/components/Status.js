import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDeviceStatus } from '../actions'

const mapDispatchToProps = (dispatch) => ({
    updateDeviceStatus: bindActionCreators(updateDeviceStatus, dispatch)
});

const Status = ({ message = "", status_type, updateDeviceStatus }) => {
    const [errorVisible, setErrorVisible] = useState(false);
    const statusHeader = status_type == "negative" ? "Error" : "Successful";
    const closeMessage = () => {
        setErrorVisible(true);
        updateDeviceStatus();
    };

    return (
        <div className={`ui ${status_type} message`} hidden={errorVisible}>
            <i className="close icon" onClick={closeMessage}></i>
            <div className="header">
                {statusHeader}
            </div>
            <p>
                {message}
            </p>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(Status);