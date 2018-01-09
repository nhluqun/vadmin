import request from '@/utils/request'

export function loginByUsername(username, password,grant_type,client_id,client_secret,scope) {
  const data = {
    username,
    password,
    grant_type,
    client_id,
    client_secret,
    scope
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    data
  })
}

export function register(name,password,email){
  const data = {
    name,
    password,
    email
  }
  return request({
    url:'/api/register',
    method:'post',
    data
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/userDetails',
    method: 'get'
  //  params: { token }
  })
}

export function queryUserByName(){
  return request({
    url:'/api/queryUserByname',
    method:'get',
    params:{username}
  })
}
