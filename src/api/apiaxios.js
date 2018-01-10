import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'

axios.interceptors.request.use(config => {
    NProgress.start()
    return config
}, error => {

    return Promise.reject(error)
})
// 这里我们把错误信息扶正, 后面就不需要写 catch 了// 这里我们把错误信息扶正, 后面就不需要写 catch 了
axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response))

function checkStatus(response) {
    NProgress.done()
    if (response.status === 200 || response.status === 304) {
        return response
    }
    {
console.log(response)
    // 异常状态下, 把错误信息返回去
    // 因为前面我们把错误扶正了, 不然像 404, 500 这样的错误是走不到这里的
    return {
        data: {
            code: -404,
            //message: response.statusText,
            message:response.message,
            data: response.data.errors,

        }
    }
}
}

function checkCode(res) {
    if (res.data.code !== 200) {
        alert(res.data.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}
