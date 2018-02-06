<template>
    <div>
        <el-row>
            <el-button type="text" @click="dialogFormVisible = true">选择题查询</el-button>
            <el-dialog title="查询条件" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-checkbox v-model="form.keshichecked">课时</el-checkbox>
                    <el-form-item label="课时" >
                        <el-select v-model="form.keshiid" filterable placeholder="请选择课时">
                            <el-option
                                    v-for="item in ksoptions"
                                    :key="item.id"
                                    :label="item.ksname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-checkbox v-model="form.gjzchecked">关健字查询</el-checkbox>
                    <el-form-item label="关健字查询" >
                        <div class="grid-content bg-purple">
                            <el-input v-model="form.gjzname" ></el-input>
                        </div>
                    </el-form-item>
                    </el-form-item>

                    <el-form-item label="班级" >
                        <div class="grid-content bg-purple">
                            <el-input v-model="form.bj" ></el-input>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="cxArray()">确 定</el-button>
                </div>
            </el-dialog>
        </el-row>
        <div align="center">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="1"
                    layout="total,prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
        <div>
            <table v-for="value in xzts.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="font-size: 36px">
                <tr >
                    <td>

                                <p> {{ value.tg }} </p>
                                <p> A{{ value.a }} </p>
                                <p> B{{ value.b }} </p>
                                <p> C{{ value.c }} </p>
                                <p> D{{ value.d }} </p>

                    </td>
                    <td>
                        <p>tu1url {{value.tu1url}} </p>
                        <p>tu2url {{value.tu2url}} </p>
                        <div v-show="value.tu1url">
                            <img :src="baseUrl+value.tu1url">
                        </div>
                        <div v-show="value.tu2url">
                            <img :src="baseUrl+value.tu2url">
                        </div>

                    </td>
                </tr>
            <tr>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="答案" name="1">
                        <div style="font-size: 48px;color:red;">        {{value.da}}</div>
                    </el-collapse-item>
                    <el-collapse-item title="解析" name="2">
                        <div style="font-size: 48px;color:red;">     {{value.da}}</div>
                    </el-collapse-item>
                </el-collapse>
            </tr>
            </table>

        </div>
    </div>
</template>

<script>
    import api from '../../api/apiaxios.js'
    export default {
        data() {
            return {
                ksoptions: [],
                form: {
                    keshiid: '',
                    gjzchecked: false,
                    keshichecked: false,
                    gjzname: '',
                    bj:''
                },
                students:[],
                dialogFormVisible: false,
                xzts: [],
                baseUrl:'http://192.168.10.10/',
                //请求的URL
                url:'api/dilixzts/search',
                //搜索条件
                criteria: '',
                gjz:'',
                keshi:'',
                //关健字，课时
                //下拉菜单选项
                select: '',
                //默认每页数据量
                pagesize: 1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                activeName: '0',
                //默认数据总数
                totalCount: 1000

            }
        },
        methods: {
            cxArray(){
                if(this.form.gjzchecked){
                    this.gjz=this.form.gjzname;
                }
                else
                {
                    this.gjz='';
                }
                if(this.form.keshichecked){
                    this.keshi=this.form.keshiid;
                }
                else{
                    this.keshi='';
                }
                this.dialogFormVisible = false;
                this.loadData();

            },
            //从服务器读取数据
            loadData: function(){
                let self=this;
                let data={
                    gjz:this.gjz,
                    keshi:this.keshi,
                    pagesize:this.pagesize
                };
                api.post(this.url,data).then(function(res)
                {
                       //console.log('loadData')
                     console.log(res)
                    self.xzts=res.data.pageDilixzts;
                    self.totalCount=res.data.pageDilixzts.length;

                },function(){
                    console.log('failed');
                });
                api.get('api/getStudents',this.bj).then(function(res)
                {
                    self.students=res.data.students.data
                })
            },

            //每页显示数据量变更
            handleSizeChange: function(val) {
                //  console.log('sizechange');
                this.pagesize = val;

            },

            //页码变更
            handleCurrentChange: function(val) {
                //    console.log('val'+val)
                this.currentPage = val;

            },

        },
        async  mounted(){
        let self = this;
        self.loadData();
        //提取课时信息
        const res= await api.get('/api/getKeshis/')
        {
            //  console.log(res)
            if (res.status===200){
                //console.log(res)
                this.ksoptions=res.data
            }
        }
    }
    }
    </script>