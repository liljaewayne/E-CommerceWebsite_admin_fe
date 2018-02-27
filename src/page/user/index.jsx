import React from "react";
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import CommerceUtil from 'util/commerce.jsx';
import UserService from "service/user-service.jsx";

const _commerce = new CommerceUtil();
const _userService = new UserService();

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], /* list必须初始化, 否则是undefined, 没法map */
            pageNum: 1,
            firstLoading: true/* 优化用户体验, 首次加载前, 显示正在加载, 加载成功后显示列表数据或错误提示数据 */
        };
    }

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList() {
        _userService.listUsers(this.state.pageNum).then(res => {
            this.setState(res,
                // 将firstLoading置为false
                () => {
                    this.setState({
                        firstLoading: false
                    })
                });
        }, errMsg => {
            this.setState({
                list: []
            });
            _commerce.errorTips(errMsg);
        });
    }

    // 当页数变化时
    onPageNumChange(pageNum) {
        // 设置完页号后, 再load一次userList
        // setState是一个异步方法, 第二个参数是成功后的回调
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }

    render() {
        let listBody = this.state.list.map((user, index) => {
            return (<tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createTime).toLocaleString()}</td>
            </tr>);
        });
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                    {this.state.firstLoading ? "正在加载数据..." : "没有查询到数据"}
                </td>
            </tr>
        );

        let tableBody = this.state.list.length > 0 ? listBody : listError;

        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>注册时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => {
                        this.onPageNumChange(pageNum);
                    }}/>
            </div>
        );
    }
}


export default UserList;