<template>
<div>
<el-row :gutter="20">
  <el-col :span="12">
    <div class="grid-content bg-purple">
    <el-input v-model="form.gjzname"  ></el-input>
   </div>
</el-col>
  <el-col :span="12">
    <div class="grid-content bg-purple">
    <el-button
     size="mini"
      @click="search()">模糊查询</el-button>
      </div>
  </el-col>

  </el-row>
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
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="cxArray()">确 定</el-button>
  </div>
</el-dialog>
  </el-row>
  <el-button
    size="mini"
    @click="create()">新建选择题</el-button>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
          label="ID"
          width="80">
          <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id}}</span>
          </template>
        </el-table-column>
    <el-table-column
          label="答案"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.da}}</span>
          </template>
        </el-table-column>
    <el-table-column
      label="选择题"
      width="400">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.xzt}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="图1地址"
      width="40">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tu1url}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="图2地址"
      width="40">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tu2url}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div align="center">
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </div>
</div>

</template>

<script>
import api from '../../api/apiaxios.js'
export default {

    data() {

      return {
        ksoptions:[],
        form:{
          keshiid:'',
          gjzchecked:false,
          keshichecked:false,
          gjzname:''
        },
    //    dialogTableVisible: false,
              dialogFormVisible: false,
              tableData: [],
             //多选数组
               multipleSelection: [],
               //请求的URL
               url:'api/dilixzts',
               //搜索条件
               criteria: [],
               gjz:[],keshi:[],//关健字，课时
               //下拉菜单选项
               select: '',
               //默认每页数据量
               pagesize: 5,
               //默认高亮行数据id
               highlightId: -1,
               //当前页码
               currentPage: 1,
             //查询的页码
               start: 1,
               //默认数据总数
               totalCount: 1000,
      }
    },
    computed:{

    },
    methods: {
      cxArray(){
       let arr=new Array();
        if(this.form.gjzchecked){
            arr['gjz']=this.form.gjzname;
        }
        if(this.form.keshichecked){
          arr['keshiid']=this.form.keshiid;
        }
        this.dialogFormVisible = false;
        this.criteria=arr;
        console.log(this.criteria);
        this.loadData(this.criteria, this.page, this.pagesize);

      },
      //从服务器读取数据
      loadData: function(criteria, page, pagesize){
      let self=this;
          //    api.get(this.url,{keyword:criteria, page:this.currentPage, pagesize:this.pagesize}).then(function(res){
      let data={criteria:this.criteria,page:this.currentPage, pagesize:this.pagesize}
              api.get(this.url,data).then(function(res)
              {
                    //   console.log('loadData')
                      //     console.log(res)
                              self.tableData = res.data.pageDilixzts.data;
                           self.totalCount=res.data.pageDilixzts.total;
                          },function(){
                              console.log('failed');
                          });
                      },

                      //多选响应
                      handleSelectionChange: function(val) {
                          this.multipleSelection = val;
                      },

                      //点击行响应
                      handleclick: function(row, event, column){
                          this.highlightId = row.id;
                      },

                      //编辑
                      handleEdit: function(index, row) {

                      this.$router.push({name:'dilixztsEditOrCreate',params:{id:row.id}})
                      },

                      //单行删除
                      handleDelete: function(index, row) {
                      let _this = this, idsParam = {};
                      let id = parseInt(row.id);
                        idsParam = {ids: id};
                      this.$confirm('此操作将永久删除该选择题, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                      }).then(() => {
                      //  console.log('idsParam')
                      //  console.log(idsParam)
                      api.delete('/api/dilixzts/destroy?ids='+id).then(function(res){
                      _this.loadData(_this.criteria, _this.currentPage, _this.pagesize);
                      this.$message({
                      type: 'success',
                    message: '删除成功!'
                });
            },function(){
            console.log('failed!');
                });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


                      },

                      //搜索
                      search: function(){
                          this.loadData(this.criteria, this.currentPage, this.pagesize);
                      },
                      create:function(){
                          this.$router.push({name:'dilixztsEditOrCreate'})
                      },
                      //添加
                      add: function(){
                              this.$prompt('请输入名称', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                              }).then(({ value }) => {
                                  if(value==''||value==null)
                                      return;
                                  this.$http.post('newstu/add',{"name":value},{emulateJSON: true}).then(function(res){
                                      this.loadData(this.criteria, this.currentPage, this.pagesize);
                                  },function(){
                                      console.log('failed');
                                  });
                              }).catch(() => {

                          });

                      },

                      //多项删除
                      deletenames: function(){
                          if(this.multipleSelection.length==0)
                              return;
                          var array = [];
                          this.multipleSelection.forEach((item) => {
                              array.push(item.id);
                          })
                          this.$http.post('newstu/delete',{"array":array},{emulateJSON: true}).then(function(res){
                              this.loadData(this.criteria, this.currentPage, this.pagesize);
                          },function(){
                              console.log('failed');
                          });
                      },

                      //改变当前点击的行的class，高亮当前行
                      tableRowClassName: function(row, index){
                         if(row.id == this.highlightId)
                         {
                            return 'info-row';
                         }
                      },

                      //每页显示数据量变更
                      handleSizeChange: function(val) {
                    //  console.log('sizechange');
                          this.pagesize = val;
                          this.loadData(this.criteria, this.currentPage, this.pagesize);
                      },

                      //页码变更
                      handleCurrentChange: function(val) {
                  //    console.log('val'+val)
                          this.currentPage = val;
                          this.loadData(this.criteria, this.currentPage, this.pagesize);
                      },

                  },
              async  mounted(){
                    let self = this;
                self.loadData(this.criteria, this.currentPage, this.pagesize);
                //  console.log('mounted');

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
