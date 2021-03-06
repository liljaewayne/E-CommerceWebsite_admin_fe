class CommerceUtil {
    //  ajax请求
    request(param) {
        // 使用Promise允许链式调用
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || "get",
                url: param.url || "",
                dataType: param.dataType || "json",
                data: param.data || null,
                success: res => {
                    if (0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (10 === res.status) {
                        // 跳转到登陆页
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    // statusText是http请求对象中的信息
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });


    }

    // 跳转登陆页
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    // 获取URL参数
    getUrlParam(name) {
        // param=123&param2=456
        let queryString = window.location.search.split('?')[1] || '';
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);

        // result = [ 'param=123', '', '123', '&' ]
        return result ? decodeURIComponent(result[2]) : null;
    }

    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || 'something went wrong');
    }

    // 错误提示
    successTips(msg) {
        alert(msg || '操作成功');
    }

    // 写入localStorage
    setStorage(name, data) {
        let dataType = typeof data;
        let basicTypes = ['number', 'string', 'boolean'];

        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        else if (basicTypes.indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        }
        else {
            alert('该类型不能用于localStorage');
        }
    }

    // 读取localStorage
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return '';
        }
    }

    // localStorage删除项
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }

}

export default CommerceUtil;