import React, { useEffect } from 'react';
import { getDevices } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeviceList from './DeviceList';
import Loader from './Loader';
import NavigationBar from './NavigationBar';
import Status from './Status';
import FooterBar from './FooterBar';

const mapStateToProps = (state) => ({
    status: state.status
});

const mapDispatchToProps = (dispatch) => ({
    getDevices: bindActionCreators(getDevices, dispatch)
});

const Dashboard = ({ getDevices, status }) => {
    useEffect(() => {
        getDevices();
    }, []);

    //Display the status according to the response from the API when trying to get the data
    const getDashboard = () => {
        if (status == "LOADING") {
            return (<Loader message="Fetching devices for you."/>);
        }
        else if(status == "ERROR") {
            return (<Status message="Please try again. Unable to load the data at the moment." status_type="negative"/>);
        }
        else {
            return (<DeviceList />);
        }
    }

    //Display our dashboard containing devices
    return (
        <React.Fragment>
            <NavigationBar />
            <div id="dashboard-container" className="ui container">{getDashboard()}</div>
            <FooterBar />
        </React.Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);