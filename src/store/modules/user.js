import { loginByUsername, logout, getUserInfo,register,queryUserByName} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import server from '../../config/api.js';
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {

      const username = userInfo.username.trim()
console.log('username='+username);
      return new Promise((resolve, reject) => {
        console.log('password'+userInfo.password+'clientid='+server.client.client_id);

        loginByUsername(username, userInfo.password,'password',server.client.client_id,server.client.client_secret,'*').then(response => {
console.log('login success!');
          const data = response.data
          commit('SET_TOKEN', data.access_token)//把token改成access_token
          setToken(response.data.access_token);
          resolve()
        }).catch(error => {
          console.log('login fail');
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
      //  getUserInfo(state.token).then(response => {
        getUserInfo().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          console.log(response.data);
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          //commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注册用户
    Register({ commit}, userInfo) {
      return new Promise((resolve, reject) => {
      //  getUserInfo(state.token).then(response => {
    const name = userInfo.name.trim();
    const password = userInfo.password.trim();
    const email=userInfo.email.trim();
    const password_confirmation=userInfo.password_confirmation.trim();

        register(name,password,email,password_confirmation).then(response => {

          if (!response.data) {
            reject('error')
          }
          resolve(response)
        }).catch(error => {
          //reject(error)
console.log(error.response.data);
//reject(error)
        return error;

        })
      })
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
//查询有没有这个用户

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
