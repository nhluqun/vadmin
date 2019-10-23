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
    <el-form-item label="答案" prop="da">
    <el-select v-model="dilixztForm.da" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
            <el-form-item label="题干" prop="tg">
                <el-input v-model="dilixztForm.tg" autoComplete="on" placeholder="tg"></el-input>
            </el-form-item>
            <el-form-item label="A选项" prop="a">
                <el-input v-model="dilixztForm.a" autoComplete="on" placeholder="a"></el-input>
            </el-form-item>
            <el-form-item label="B选项" prop="b">
                <el-input v-model="dilixztForm.b" autoComplete="on" placeholder="b"></el-input>
            </el-form-item>
            <el-form-item label="C选项" prop="c">
                <el-input v-model="dilixztForm.c" autoComplete="on" placeholder="c"></el-input>
            </el-form-item>
            <el-form-item label="D选项" prop="d">
                <el-input v-model="dilixztForm.d" autoComplete="on" placeholder="d"></el-input>
            </el-form-item>

    <el-form-item label="课时" prop="keshiid">
    <el-select v-model="dilixztForm.keshiid" filterable placeholder="请选择课时">
        <el-option
          v-for="item in ksoptions"
          :key="item.id"
          :label="item.ksname"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
      <el-upload
        class="upload-demo"
        action="http://tk55.com/api/upfile"
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :beforeUpload="beforeAvatarUpload"
        :auto-upload="false"
        :limit="1"
        :on-success="handleSuccess1"
        :before-upload="handleBefore"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form-item label="图1" prop="tu1url">
          <el-input v-model="dilixztForm.tu1url" autoComplete="on" placeholder="tu1url"></el-input>
      </el-form-item>
      <el-upload
        class="upload-demo"
        action="http://tk55.com/api/upfile"
        ref="upload2"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :beforeUpload="beforeAvatarUpload"
        :auto-upload="false"
        :limit="1"
        :on-success="handleSuccess2"
        :before-upload="handleBefore"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form-item label="图2" prop="tu2url">
          <el-input v-model="dilixztForm.tu2url" autoComplete="on" placeholder="tu2url"></el-input>
      </el-form-item>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
 <img v-bind:src="tu1" class="image">
<img v-bind:src="tu2" class="image">
      </div></el-col>
    </el-row>

<div>
<!--  <Tinymce :height="300" v-model="dilixztForm.xzttext"></Tinymce>-->
</div>
            <p >{{dilixztForm.xzttext}}</p>
     <el-form-item>
                <el-button type="primary" @click="submitForm('dilixztForm')">{{mode}}</el-button>
                <el-button @click="resetForm('dilixztForm')" >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import api from '../../api/apiaxios.js';
//import api from '../../utils/request';
import formerror from '../../components/FormError.vue';


export default {
name: 'demo',
components: { Tinymce,formerror },
    data(){
        return {
        mode:'新建',
      //  action:"http://localhost:8000/api/upfile",
        fileList: [],
       imgBaseUrl:'http://tk55.com/images/',
        errors:[],ksoptions:[],
        options: [{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }, {
          value: 'D',
          label: 'D'
        }, {
          value: 'AB',
          label: 'AB'
        },{
          value: 'AC',
          label: 'AC'
        },{
          value: 'AD',
          label: 'AD'
        },{
          value: 'BC',
          label: 'BC'
        },{
          value: 'BD',
          label: 'BD'
        },{
          value: 'CD',
          label: 'CD'
        },],

            dilixztForm: {
              id:'',
              xzt: '',
              tu1url: '',
              tu2url:'',
              da:'',
              keshiid:'',
              xzttext:'',
                tg:'',
                a:'',
                b:'',
                c:'',
                d:''
            },

            rules: {
                xzt: [
                    { required: true, message: '题目内容不能少', trigger: 'blur'},
                    ]
            }
        }
    },
    computed: {
    tu1:function(){
    return this.imgBaseUrl+this.dilixztForm.tu1url
    },
    tu2:function(){
    return this.imgBaseUrl+this.dilixztForm.tu2url
    }
    },
    methods: {
    async xztUpdate() {
    let self = this;
    const res= await api.update('/api/dilixzts/update', this.dilixztForm)
        if (res.status === 200) {
  //  console.log(res)
    //    console.log(res);
     //   this.$router.push({ path: '/dilixzts/List' })
    }
    else
    {
  //  console.log(res.data.errors)
self.errors = res.data.errors;
    }
  },
  async xztCreate() {
  let self = this;
//  console.log('dilixztForm')
//  console.log(this.dilixztForm)
  const res=await api.post('/api/dilixzts', this.dilixztForm)
  //console.log('create')
   //console.log(res)
  if (res.status === 200) {
//  console.log(res)
  //    console.log(res);
      this.$router.push({ path: '/dilixzts/List' })
  }
  else
  {
  //console.log(res.data.errors)
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
                  if(this.mode=='更新'){
                  this.xztUpdate()
                  }
                  else{
                  this.xztCreate()   //新建
                  }
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
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
                //console.log(file.size);
              //    console.log(extension);
          //    console.log(extension2);
          //    console.log(isLr500k);
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
          //      console.log(extension || extension2 && !isLr500k)
                return extension || extension2 && !isLr500k
            },
            submitUpload() {
       this.$refs.upload.submit();
     },
     submitUpload2() {
this.$refs.upload2.submit();
},
     handleSuccess1(response){
    //  console.log(response)
      this.dilixztForm.tu1url= response.imagepath
    //  console.log(this.imgBaseUrl + response.imagepath)
    //  console.log(this.dilixztForm.tu1url)
    },
    handleSuccess2(response){
    // console.log(response)
      this.dilixztForm.tu2url= response.imagepath
   },
    handleBefore(){
      return this.files.length === 1 ? false : true // 只让它上传一张
    }
    },
    async mounted(){
    //提取课时信息
    const res= await api.get('/api/getKeshis/')
    {
  //  console.log(res)
    if (res.status===200){
    //console.log(res)
      this.ksoptions=res.data
    }
    }
       console.log('edit');
       console.log(this.$route.params.id);
       if(this.$route.params.id){
       this.mode='更新'
       const res2= await api.get('/api/dilixzts/'+this.$route.params.id+'/edit')
       //console.log(res2);
       if (res2.status === 200) {
    //   console.log(res2.data.data);
       this.dilixztForm=res2.data;
    //   console.log('dilixztForm')
      // console.log(this.dilixztForm);
       }
       else{
    //   console.log('else')
    //   console.log(res2);
       }
       }else{
       this.mode='新建'
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
  .editor-content{
    margin-top: 20px;
  }
}
</style>
