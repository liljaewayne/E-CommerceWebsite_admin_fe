import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: 'old state'
        };
        console.log("初始化数据", "constructor");
    }

    // 组件将要加载
    componentWillMount() {
        console.log("componentWillMount");
    }

    // 组件加载完成
    componentDidMount() {
        console.log("componentDidMount");
    }

    // 将要接收父组件传来的props
    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    // 子组件是否应该更新
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;
    }

    // 组件将要更新
    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    // 组件更新完成
    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    // 渲染
    render() {
        console.log("render");
        return (
            <div>
                <div>Props: {this.props.data}</div>
                <button onClick={() => {
                    this.handleClick();
                }}>更新组件
                </button>
            </div>
        );
    }

    // 处理点击事件
    handleClick() {
        console.log("更新数据", "handleClick");
        this.setState({
            data: 'New State'
        });
    }
}

class App extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: 'old Props'
        };
        console.log("初始化数据", "constructor");
    }

    onPropsChange() {
        console.log("更新props");
        this.setState({
            data: 'new Props'
        });
    }

    render() {
        return (
            <div>
                <Component data={this.state.data}></Component>
                <button onClick={() => {
                    this.onPropsChange()
                }}>改变Props
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);
