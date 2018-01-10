<template>

    <div class="login-container">
        <el-form class="login-form" :model="regForm" :rules="rules" label-width="100px" ref="regForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="regForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="regForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="regForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="regForm.checkPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
                <el-button @click="resetForm('regForm')" >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from '../../api/apiaxios.js';

export default {

    data(){

        //自定义验证规则
        let validatePass1 = (rule, value, callback) => {
            // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
            let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
            if(!reg.test(value)){
                callback(new Error('密码长度需6-16位，且包含字母和字符'));
            }else{
                callback();
            }

        };
        //验证密码是否重复
        let validatePass2 = (rule, value, callback) => {
            if(value !== this.regForm.password){
                callback(new Error('两次密码输入不一致'));
            }else{
                callback();
            }
        };

        return {
            regForm: {
                name: '',
                password: '',
                email:'',
                checkPassword: ''
            },
            rules: {
                name: [
                    { required: true, message: '用户名不能少', trigger: 'blur'},
                    { min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}

                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur'},
                    //{ validator: validateEmail, trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'},
                    { validator: validatePass1, trigger: 'blur'}
                ],
                checkPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur'},
                    { validator: validatePass2, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
    async register() {
    const { data: { code, data }} = await api.post('/api/register', this.regForm)
    if (code === 200) {
        console.log(data)
    }
    else
    {
    console.log(code)
    console.log(data)
console.log(message)
    }
  },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过

            /* this.$store.dispatch('Register', this.regForm)
                  //    api.userRegister(this.regForm)
                        .then(({ data }) => {

//                        console.log(data);
//console.log('register'+data.success);
                            if(data.success){
                                this.$message({
                                    type: 'success',
                                    message: '注册成功'
                                });
                  this.$router.push({ path: '/login' })

                            }else{

                                this.$message({
                                    type: 'info',
                                    message: '用户名已经存在'
                                });

                            }
                        }

                        );   */
                        this.register();
                }else{ //验证不通过
                console.log('验证不通过');
                    return false;
                }
            });
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
