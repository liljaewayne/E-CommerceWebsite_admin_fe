import CommerceUtil from 'util/commerce.jsx';

const _commerce = new CommerceUtil();

class StatisticService {
    // 获取首页统计数据
    getHomeCount(loginInfo) {
        // 直接返回Promise对象, 使调用者可以链式调用
        return _commerce.request({
            type: "post",
            url: '/manage/statistic/base_count.do',
        });
    }

}

export default StatisticService;