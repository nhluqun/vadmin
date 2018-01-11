import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  //console.log('token='+store.getters.token);
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer '+getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  //console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
//service.interceptors.response.use(
//  response => response,
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
//  const data = response.data;

// const data = response.data
//
// // 根据返回的code值来做不同的处理（和后端约定）
//   switch (data.code) {
//     case '0':
//       // 举例
//       // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
//       if (isIOS()) {
//         // 异步以保证数据已渲染到页面上
//         setTimeout(() => {
//           // 通过滚动强制浏览器进行页面重绘
//           document.body.scrollTop += 1
//         }, 0)
//       }
//       // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
//       return data
//
//     // 需要重新登录
//     case 'SHIRO_E5001':
//       // 微信生产环境下授权登录
//       if (isWeChat() && IS_PRODUCTION) {
//         axios.get(apis.common.wechat.authorizeUrl).then(({ result }) => {
//           location.replace(global.decodeURIComponent(result))
//         })
//       } else {
//         // 否则跳转到h5登录并带上跳转路由
//         const search = encodeSearchParams({
//           next: location.href,
//         })
//
//         location.replace(`/user/login?${search}`)
//       }
//
//       // 不显示提示消息
//       data.description = ''
//       break
//
//     default:
//   }
//   // 若不是正确的返回code，且已经登录，就抛出错误
//   const err = new Error(data.description)
//
//   err.data = data
//   err.response = response
//
//   throw err
// }, (err) => { // 这里是返回状态码不为200时候的错误处理
//   if (err && err.response) {
//     switch (err.response.status) {
//       case 400:
//         err.message = '请求错误'
//         break
//
//       case 401:
//         err.message = '未授权，请登录'
//         break
//
//       case 403:
//         err.message = '拒绝访问'
//         break
//
//       case 404:
//         err.message = `请求地址出错: ${err.response.config.url}`
//         break
//
//       case 408:
//         err.message = '请求超时'
//         break
//
//       case 500:
//         err.message = '服务器内部错误'
//         break
//
//       case 501:
//         err.message = '服务未实现'
//         break
//
//       case 502:
//         err.message = '网关错误'
//         break
//
//       case 503:
//         err.message = '服务不可用'
//         break
//
//       case 504:
//         err.message = '网关超时'
//         break
//
//       case 505:
//         err.message = 'HTTP版本不受支持'
//         break
//
//       default:
//     }
//   }
//
//    return Promise.reject(err)
//
// )

// 拦截响应response，并做一些错误处理
service.interceptors.response.use((response) => {
  const data = response.data

// 根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case '0':
      // 举例
      // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
      if (isIOS()) {
        // 异步以保证数据已渲染到页面上
        setTimeout(() => {
          // 通过滚动强制浏览器进行页面重绘
          document.body.scrollTop += 1
        }, 0)
      }
      // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
      return data

    // 需要重新登录
    case 'SHIRO_E5001':
      // 微信生产环境下授权登录
      if (isWeChat() && IS_PRODUCTION) {
        axios.get(apis.common.wechat.authorizeUrl).then(({ result }) => {
          location.replace(global.decodeURIComponent(result))
        })
      } else {
        // 否则跳转到h5登录并带上跳转路由
        const search = encodeSearchParams({
          next: location.href,
        })

        location.replace(`/user/login?${search}`)
      }

      // 不显示提示消息
      data.description = ''
      break

    default:
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.description)

  err.data = data
  err.response = response

  throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break
      case 422:
        err.message='输入数据错误'
        return {
            data: {
                code: -422,
                //message: response.statusText,
        //        message:err.response.data.message,
                data: err.response.data.errors,
            }
         //break
       }
      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }

  return Promise.reject(err)
})


  // error => {
  //   console.log('err' + error)// for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // })

export default service
