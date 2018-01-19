<template>

    <div class="create-container">

        <el-form class="edit-form" :model="dilixztForm" :rules="rules" label-width="100px" ref="dilixztForm">
        <div class="title-container">
          <h3 class="title">编辑选择题</h3>
        </div>
            <el-form-item label="题目内容" prop="xzt">
            <el-input
type="textarea"
:rows="6"
placeholder="请输入题目内容"
v-model="dilixztForm.xzt">
</el-input>
    </el-form-item>
  
    <el-upload
      class="upload-demo"
      action="/posts/"
      ref="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :beforeUpload="beforeAvatarUpload"
      :auto-upload="false"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
            <el-form-item label="图1" prop="tu1url">
                <el-input v-model="dilixztForm.tu1url" autoComplete="on" placeholder="tu1url"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('dilixztForm')">新增</el-button>
                <el-button @click="resetForm('dilixztForm')" >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from '../../api/apiaxios.js';
//import api from '../../utils/request';
import formerror from '../../components/FormError.vue'
export default {
  async mounted(){
     console.log('edit');
     console.log(this.$route.params.id);
     const res= await api.get('/api/dilixzts/'+this.$route.params.id+'/edit')
     console.log(res);
     if (res.status === 200) {
  //   console.log(res.data.data);
     this.dilixztForm=res.data;
  //   console.log(this.dilixztForm);
     }
     else{
     console.log('else')
     console.log(res);
     }
     },
    data(){

        return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

        errors:[],
            dilixztForm: {
              xzt: '',
              ur1url: '',
              da:''
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
    xztUpdate() {
    let self = this;
    const res=api.post('/api/dilixzts/update', this.regForm)
    if (res.status === 200) {
    console.log(res)
        console.log(res);
        this.$router.push({ path: '/dilixzts' })
    }
    else
    {
    console.log(res.data.errors)
self.errors = res.data.errors;
    }
  },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
        let self = this;
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过
                  this.xztUpdate();
                }else{ //验证不通过
                console.log('验证不通过');
                    return false;
                }
            });
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeAvatarUpload(file) {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                //const isLt2M = file.size / 1024 / 1024 < 10
                const isLr500k=file.size /1024 /1024 >0.5;
                console.log(file.size);
                  console.log(isLr500k);
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 png、jpg格式!',
                        type: 'warning'
                    });
                }
                if(isLr500k) {
                    this.$message({
                        message: '上传文件大小不能超过 500kb!',
                        type: 'warning'
                    });
                }
                console.log(extension || extension2 && isLr500k)
                return extension || extension2 && isLr500k
            },
            submitUpload() {
       this.$refs.upload.submit();
     },
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
