import CommerceUtil from 'util/commerce.jsx';

const _commerce = new CommerceUtil();

class UserService {
    // 登录
    login(loginInfo) {
        // 直接返回Promise对象, 使调用者可以链式调用
        return _commerce.request({
            type: "post",
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }

    // 检查登录接口的参数合法性
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空'
            };
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空'
            };
        }

        return {
            status: true,
            msg: '验证通过'
        };
    }
}

export default UserService;