import React from "react";
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

/**
 * 分页组件
 * https://github.com/react-component/pagination
 */
class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="row">
                <div className="col-md-12">
                    {/* ...是解构函数, 等同于将json对象的每项都应用到组件的对应属性上 */}
                    <RcPagination {...this.props}
                                  hideOnSinglePage
                                  showQuickJumper/>
                </div>
            </div>
        );
    }
}

export default Pagination;