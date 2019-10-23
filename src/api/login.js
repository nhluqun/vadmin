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
export function loginByName(username,password,grant_type,client_id,client_secret,scope){
  const data = {
    username,
    password,
    grant_type,
    client_id,
    client_secret,
    scope
  }
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
export function register(name,password,email,password_confirmation){
  const data = {
    name,
    password,
    email,
    password_confirmation
  }
  return request({
    url:'/api/Aregister',
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

export function queryUserByName(name){

  return request({
    url:'/api/queryUserByname',
    method:'get',
    params:{name}

  })
}
