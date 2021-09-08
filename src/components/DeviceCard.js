import React from 'react';
import DeviceStatus from './DeviceStatus';

const DeviceCard = ({ device }) => {
    const {name, unit, value, timestamp, active } = device;
    const date = new Date(timestamp).toLocaleString();

    //Display individual device details in the form of a card
    return (
        <div className="ui card">
            <div className="content">
                <p className="header">{name}</p>
                <div className="meta">
                    <span className="category">{date}</span>
                </div>
                <div className="description">
                    <p>{value} {unit}</p>
                </div>
            </div>
            <div className="extra content">
                <DeviceStatus status={active} name={name}/>
            </div>
        </div>
    );
};

export default DeviceCard;