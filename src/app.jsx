import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';

// 布局
import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import OrderList from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';

class App extends React.Component {

    render() {

        return (
            <Router>
                <Switch>
                    {/* 登录页 */}
                    <Route path="/login" component={Login}></Route>
                    {/* 一般页面 */}
                    <Route path="/" render={props => {
                        return (
                            <Layout>{/* 布局 */}
                                {/* 布局中引用的内容板块 */}
                                <Switch>
                                    <Route exact path="/" component={Home}></Route>

                                    <Route path="/product" component={ProductRouter}></Route>
                                    <Route path="/product-category" component={ProductRouter}></Route>
                                    <Route path="/order/index" component={OrderList}/>
                                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                                    <Route path="/user/index" component={UserList}></Route>

                                    <Redirect exact from="/user" to="/user/index"></Redirect>
                                    <Redirect exact from="/order" to="/order/index"/>
                                    {/* 错误页面 */}
                                    <Route component={ErrorPage}></Route>
                                </Switch>
                            </Layout>
                        );
                    }}></Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);
