import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';

// 布局
import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* 登录页 */}
                    <Route path="/login" component={Login}></Route>
                    {/* 一般页面 */}
                    <Route path="/" render={(props) => {
                        return (
                            <Layout>{/* 布局 */}
                                {/* 布局中引用的内容板块 */}
                                <Switch>
                                    <Route exact path="/" component={Home}></Route>
                                    <Route exact path="/product" component={Home}></Route>
                                    <Route exact path="/product-category" component={Home}></Route>
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
