<template>
<div>

<el-input v-model="criteria"  ></el-input>
<el-button
  size="mini"
  @click="search()">模糊查询</el-button>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
          label="ID"
          width="80">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.id}}</span>
          </template>
        </el-table-column>
    <el-table-column
          label="答案"
          width="80">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
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

        tableData: [],
        //多选数组
               multipleSelection: [],

               //请求的URL
               url:'api/dilixzts',

               //搜索条件
               criteria: '',

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
    methods: {

      //从服务器读取数据
      loadData: function(criteria, page, pagesize){
      let self=this;
              api.get(this.url,{keyword:criteria, page:this.currentPage, pagesize:this.pagesize}).then(function(res){
console.log('loadData')
                           console.log(res)
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
                      /*    this.$prompt('请输入新名称', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                              }).then(({ value }) => {
                                  if(value==''||value==null)
                                      return;
                                  this.$http.post('newstu/update',{"id":row.id,"name":value},{emulateJSON: true}).then(function(res){
                                      this.loadData(this.criteria, this.currentPage, this.pagesize);
                                  },function(){
                                      console.log('failed');
                                  });
                              }).catch(() => {

                          }); */
                          console.log(row)
                          console.log(row.id)
                      this.$router.push({name:'dilixztsEdit',params:{id:row.id}})
                      },


                      //单行删除
                      handleDelete: function(index, row) {
                          var array = [];
                          array.push(row.id);
                          this.$http.post('newstu/delete',{"array":array},{emulateJSON: true}).then(function(res){
                              this.loadData(this.criteria, this.currentPage, this.pagesize);
                          },function(){
                              console.log('failed');
                          });
                      },

                      //搜索
                      search: function(){
                          this.loadData(this.criteria, this.currentPage, this.pagesize);
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
                      console.log('sizechange');
                          this.pagesize = val;
                          this.loadData(this.criteria, this.currentPage, this.pagesize);
                      },

                      //页码变更
                      handleCurrentChange: function(val) {
                      console.log('val'+val)
                          this.currentPage = val;
                          this.loadData(this.criteria, this.currentPage, this.pagesize);
                      },

                  },
                 mounted(){
                    let self = this;
                self.loadData(this.criteria, this.currentPage, this.pagesize);
                //  console.log('mounted');

                },

    }

</script>
