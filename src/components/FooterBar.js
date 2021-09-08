import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    device_count: state.device_count
});

const FooterBar = ({ device_count }) => {
    return (
        <div className="ui bottom fixed large menu">
            <div className="item">Active Devices<div className="ui green label">{device_count.active}</div></div>
            <div className="item">Inactive Devices<div className="ui red label">{device_count.inactive}</div></div>
        </div>
    );
};

export default connect(mapStateToProps)(FooterBar);