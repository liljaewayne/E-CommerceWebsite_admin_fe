import React from 'react';

import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import './theme.css';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <TopNav></TopNav>
                <SideNav></SideNav>
                {this.props.children}{/* page-wrapper */}
            </div>
        );
    }
}

export default Layout;