<template>

    <div class="create-container">

        <el-form class="create-form" :model="dilixztForm" :rules="rules" label-width="100px" ref="dilixztForm">
        <div class="title-container">
          <h3 class="title">新增选择题</h3>

        </div>

            <el-form-item label="题目内容" prop="xzt">
            <el-input
type="textarea"
:rows="6"
placeholder="请输入题目内容"
v-model="dilixztForm.xzt">
</el-input>
    </el-form-item>

            <el-form-item label="图1" prop="tu1url">
                <el-input v-model="regForm.tu1url" autoComplete="on" placeholder="tu1url"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('dilixztForm')">新增</el-button>
                <el-button @click="resetForm('regForm')" >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from '../../api/apiaxios.js';
//import api from '../../utils/request';
import formerror from '../../components/FormError.vue'
export default {

    data(){

        return {
        errors:[],
            dilixztForm: {
                xzt: '',
              ur1url: ''
            },
            rules: {
                xzt: [
                    { required: true, message: '题目内容不能少', trigger: 'blur'},


                ],
                ur1url: [
                    { required: true, message: '请输入图片地址', trigger: 'blur'},
                ],

            }
        }
    },
    methods: {
    async xztPost() {
    let self = this;
    const { data: { code, data }} = await api.post('/api/dilixzts/create', this.regForm)
    if (code === 200) {
    console.log(res)
        console.log(data);
        this.$router.push({ path: '/dilixzts' })
    }
    else
    {
    console.log(code)
    console.log(data)
console.log(res)
self.errors = data;
    }
  },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
        let self = this;
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过
                  this.xztPost();
                }else{ //验证不通过
                console.log('验证不通过');
                    return false;
                }
            });
        }
    },
      components: { formerror }
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
