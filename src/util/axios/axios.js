import axios from 'axios';
import config from './config';

const instance = axios.create(config);

// 添加请求拦截器
instance.interceptors.request.use(
  request => request,
  error => Promise.reject(error)
);

// 添加响应拦截器
instance.interceptors.response.use(
  //   response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    if (response.code !== 200) {
      return Promise.reject(response.message);
    }
    // 对响应数据做些事
    if (response.data.code === '0' || response.data.code === '200') {
      return Promise.resolve(response.data.data);
    }
    return response;
},
// 返回接口返回的错误信息
error => Promise.reject(error.message)
);

// get
export function get(url, params = {}) {
  params.t = new Date().getTime();// get方法加一个时间参数,解决ie下可能缓存问题.
  // 默认设置
  const conf = {
    url,
    method: 'get',
    headers: {},
    params
  };
  return instance(conf);
}

// post
export function post(url, data = {}) {
  // 默认设置
  const conf = {
    url,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(data)
  };
  return instance(conf);
}

export function put(url, data = {}) {
  const conf = {
    url,
    method: 'put',
    headers: {
        //   'Content-Type':'application/json;charset=UTF-8'
        'X-Requested-With': 'XMLHttpRequest'
    },
    data: JSON.stringify(data)
  };
  return instance(conf);
}

export function deletes(url) {
  const conf = {
    url,
    method: 'delete',
    headers: {}
  };
  return instance(conf);
}
