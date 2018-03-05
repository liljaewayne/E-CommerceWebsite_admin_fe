import React from 'react';
import {Link} from 'react-router-dom';
import CommerceUtil from 'util/commerce.jsx';
import UserService from "service/user-service.jsx";

const _commerce = new CommerceUtil();
const _userService = new UserService();

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: _commerce.getStorage('userInfo').username || ""
        }
    }

    // 退出登录
    onLogout() {
        _userService.logout().then(res => {
            _commerce.removeStorage("userInfo");
            // window.location.href = '/login';
        }, errMsg => {
            _commerce.errorTips(errMsg)
        });
    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>COMMERCE</b></Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                    ? <span>欢迎, {this.state.username}</span>
                                    : <span onClick={() =>
                                        _commerce.doLogin()
                                    }>请登录</span>
                            }

                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {
                                    this.onLogout()
                                }}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default TopNav;