/**
 * Created by jiachenpan on 16/11/18.
 */
import api from '@/api/apiaxios.js'

import axios from 'axios'
//import {queryUserByName} from '@/api/login.js'
//这个是登录介面的
export function isvalidUsername(str) {
 // const valid_map = ['admin', 'editor','nhluqun'] //只能这三个中的一个，那其他的怎么办？
  //return valid_map.indexOf(str.trim()) >= 0
return 1
  //先暂时不做任何判断
}
export function isvalidRegisterUsername(str) {
  console.log(!nameExist(str)) //全部返回false
  return !nameExist(str)
}
async function nameExist(str) {
  var params = {
    "name" : str
   }
  ///var parms =  JSON.parse('{ "name":' + str + '}')
// console.log(parms)

 axios.get('/api/queryUserByName', {params}).then(function (response) {
  // console.log(response)
  // console.log(response.data.hasname);
   if (response.data.hasname == 'yes') {return true } else {return false }
  })
    .catch(function (error) {
      console.log(error);
    });
 }

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
