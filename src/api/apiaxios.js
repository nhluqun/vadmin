import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
//import { Message } from 'element-ui'//重复

const ser = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})
ser.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer '+getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Cookie']='XDEBUG_SESSION=PHPSTORM'
  }
    NProgress.start()
    console.log(ser.interceptors.request);
    return config
}, error => {

    return Promise.reject(error)
})



// 这里我们把错误信息扶正, 后面就不需要写 catch 了// 这里我们把错误信息扶正, 后面就不需要写 catch 了
ser.interceptors.response.use(response => response,
   error => Promise.resolve(error.response))


function checkStatus(response) {
//  console.log(response);
    NProgress.done()
    if (response.status === 200 || response.status === 304) {
      //  return response
    //   console.log(response);
    // Message({
    //             message: response.statusText,
    //             type: 'success'
    //           });
        // return {
        //     res: {
        //         code: 200,
        //         message: response.statusText,
        //         data: response.data
        //     }
        // }
        return response;
    }
    else
    {
      switch (response.status) {
        case 400:
        Message.error({
                    message: '请求错误',
                                });
          break

        case 401:
        Message.error({
                    message: '未授权，请登录',
                                });
          break

        case 403:
        Message.error({
                    message: '拒绝访问',
                                });

          break

        case 404:
        Message.error({
                    message: `请求地址出错: ${err.response.config.url}`,
                                });

          break

        case 408:
        Message.error({
                    message: '请求超时',
                                });

          break
        case 422:
          //err.message='输入数据错误'
  //console.log('case 422')
//  console.log(response);
        //  return response;
           //break
           Message.error({
                       message: '输入数据错误',
                                   });
           // return {
           //     res: {
           //         code: -404,
           //         message: response.statusText,
           //         data: response.data.errors,
           //     }
           // }
           return response;//改成最原始的方式处理。
        case 500:
        Message.error({
                    message: '服务器内部错误',
                                });

          break

        case 501:
        Message.error({
                    message: '服务未实现',
                                });

          break

        case 502:
        Message.error({
                    message:  '网关错误',
                                });

          break

        case 503:
        Message.error({
                    message:  '服务不可用',
                                });

          break

        case 504:
        Message.error({
                    message:  '网关超时',
                                });

          break

        case 505:
        Message.error({
                    message:   'HTTP版本不受支持',
                                });

          break

        default:
    }
return response;
}

}

export default {
    post(url, data) {
        return ser({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

            }
      //  }).then(checkStatus).then(checkCode)
        }).then(checkStatus)
    },
    //post成功之后没有code,
    get(url, data) {
        return ser({
            method: 'get',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

            }
        //}).then(checkStatus).then(checkCode)
        }).then(checkStatus)
    },
    delete(url,data) {
        return ser.delete(
           url,
           {data:data,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
          }).then(checkStatus)
    },
    update(url, data) {
        return ser.put(url,data).then(checkStatus)
    }
    }
