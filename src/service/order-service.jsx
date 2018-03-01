import CommerceUtil from 'util/commerce.jsx'

const _commerce = new CommerceUtil();

class Order {
    // 获取订单列表
    listOrders(listParam) {
        let url = '',
            data = {};
        if (listParam.listType === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _commerce.request({
            type: 'post',
            url: url,
            data: data
        });
    }

    // 获取订单详情
    getOrderDetail(orderNumber) {
        return _commerce.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNumber
            }
        });
    }

    sendGoods(orderNumber) {
        return _commerce.request({
            type: 'post',
            url: '/manage/order/send_goods.do',
            data: {
                orderNo: orderNumber
            }
        });
    }
}

export default Order;