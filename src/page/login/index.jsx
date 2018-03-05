import React from "react";
import CommerceUtil from 'util/commerce.jsx';
import UserService from "service/user-service.jsx";
import './index.scss';

const _commerce = new CommerceUtil();
const _userService = new UserService();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _commerce.getUrlParam('redirect') || '/'
        }
    }

    // login页面不在默认Layout下, 手动改变页面title
    componentWillMount() {
        document.title = '登录 - COMMERCE ADMIN';
    }


    // 当输入框发生改变
    onInputChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    // 当按回车
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }

    // 当提交表单
    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        let checkResult = _userService.checkLoginInfo(loginInfo);
        if (checkResult.status) {
            _userService.login(loginInfo).then((res) => {
                // 用户信息存储到localStorage
                _commerce.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _commerce.errorTips(errMsg);
            });
        } else {// 验证不通过
            _commerce.errorTips(checkResult.msg);
        }

    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - COMMERCE管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input className="form-control"
                                       placeholder="请输入用户名"
                                       type="text"
                                       name="username"
                                       autoComplete="off"
                                       autoFocus
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={(e) => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                       placeholder="请输入密码"
                                       type="password"
                                       name="password"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={(e) => this.onInputChange(e)}/>
                            </div>
                            <button type="button"
                                    className="btn btn-lg btn-primary btn-block"
                                    onClick={e => this.onSubmit()}>
                                登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;