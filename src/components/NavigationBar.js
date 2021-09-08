import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchWord, getDevices } from '../actions';

const mapStateToProps = (state) => ({
    search_device: state.search_device
});

const mapDispatchToProps = (dispatch) => ({
    searchWord: bindActionCreators(searchWord, dispatch),
})

const NavigationBar = ({ search_device, searchWord }) => {

    //Navigation bar containing search bar and reload option
    return (
        <div className="ui top attached large menu">
            <div className="header item">Relayr</div>
            <div className="right menu">
                <div className="ui right aligned category search item">
                    <div className="ui transparent icon input">
                        <input className="prompt" type="text" placeholder="Search devices..." value={search_device} onChange={e => searchWord(e.target.value)} />
                        <i className="search link icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);