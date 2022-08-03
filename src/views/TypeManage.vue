<template>
  <div>
    <div style="font-size: xx-large;font-weight: bolder">
      <i class="el-icon-s-fold"></i>
      分类管理
    </div>
    <el-divider>

    </el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="16">
                <div style="font-size: x-large;font-weight: bolder;margin-top: 5px">
                  {{ tableTitle }}
                </div>
              </el-col>
              <el-col :span="4">
                <el-button @click="resetForm('sortsForm')">重置</el-button>
              </el-col>
              <el-col :span="4">
                <el-button @click="submitForm('sortsForm')" type="primary">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-form label-position="top" ref="sortsForm" :rules="rules" label-width="80px" :model="sortsForm">
              <el-form-item label="分类名称" prop="sortName">
                <el-input v-model="sortsForm.sortName"></el-input>
              </el-form-item>
              <el-form-item label="分类别名" prop="sortAlias">
                <el-input v-model="sortsForm.sortAlias"></el-input>
              </el-form-item>
              <el-form-item label="分类描述" prop="sortDescription">
                <el-input v-model="sortsForm.sortDescription" type="textarea" autosize></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col>
                <div style="font-size: x-large;font-weight: bolder;margin-top: 5px">
                  分类列表
                </div>
              </el-col>
            </el-row>
          </div>
          <el-table
              :data="sortsTable"
              border
              style="width: 100%">
            <el-table-column
                prop="sortName"
                label="分类名称"
                width="100">
            </el-table-column>
            <el-table-column
                prop="sortAlias"
                label="分类别名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="sortDescription"
                label="分类描述">
            </el-table-column>
            <el-table-column
                prop="sortEditBy"
                label="修改人"
                width="100">
            </el-table-column>
            <el-table-column
                prop="sortEditDate"
                label="修改时间"
                width="160">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-col :span="8">
                  <el-button
                      size="mini"
                      @click="editSort(scope.$index, scope.row)">编辑</el-button>
                </el-col>
                <el-col :span="8">
                  <el-popconfirm
                      confirm-button-text='确定'
                      cancel-button-text='取消'
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定删除这条数据吗?"
                      @confirm="deleteSort(scope.$index,scope.row)"
                  >
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                  </el-popconfirm>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="start">
            <el-col :span="12">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="page"
                  style="margin-top: 20px;"
                  :current-page.sync="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "RemarkManage",
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.sortsForm.sortId === ''){
            this.sortsForm.sortCreateBy = 1;
            axios.post('/sorts',this.sortsForm).then(function (res){
              if(res.data === 'success'){
                _this.$message({
                  message:'添加成功！',
                  type: 'success'
                })
                _this.page(1)
              }else {
                _this.$message({
                  message:'添加失败！',
                  type: 'error'
                })
              }
            })
          }else{
            axios.put('/sorts',this.sortsForm).then(function (res){
              if(res.data === 'success'){
                _this.$message({
                  message:'修改成功！',
                  type: 'success'
                })
                _this.page(1)
              }else {
                _this.$message({
                  message:'修改失败！',
                  type: 'error'
                })
              }
            })
            _this.tableTitle='添加分类';
          }
        } else {
          console.log('error submit!!');
          return false;
        }
        _this.sortsForm = {
          sortId: '',
          sortName:'',
          sortAlias: '',
          sortDescription: '',
          sortCreateBy:'',
        }
      });
    },
    page(currentPage) {
      const _this = this;
      axios.get("/sorts/" + currentPage + "/" + this.pageSize).then(function (res) {
        _this.total = res.data.total;
        _this.sortsTable = res.data.sortsList;
      })
    },
    editSort(index,row){
      this.tableTitle='修改分类';
      this.sortsForm.sortId = row.sortId;
      this.sortsForm.sortName = row.sortName;
      this.sortsForm.sortAlias = row.sortAlias;
      this.sortsForm.sortDescription = row.sortDescription;
      this.sortsForm.sortCreateBy = 1;
    },
    deleteSort(index,row){
      const _this = this;
      axios.delete('/sorts/'+row.sortId).then(function (res) {
        let response = res.data;
        if(response.message.typeCode === '200'){
          _this.$message({
            type: 'success',
            message: response.message.message
          })
        }else {
          console.log(response.message.typeCode)
          _this.$message({
            type: 'error',
            message: response.message.message
          })
        }
      })
      this.page(1);
    }
  },
  data() {
    return {
      tableTitle: '添加分类',
      sortsForm: {
        sortId: '',
        sortName:'',
        sortAlias: '',
        sortDescription: '',
        sortCreateBy:'',
      },
      sortsTable: [],
      rules: {
        sortName: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ],
        sortAlias: [
          {required: true, message: '请选择分类别名', trigger: 'blur'}
        ],
        description:[]
      },
      total:100,
      currentPage:1,
      pageSize:5
    }
  },
  created() {
    this.page(1);
  }
}
</script>

<style scoped>
.el-card {
  height: 530px;
  overflow-y: auto;
}
.el-divider {
  background: #55a532;
}
</style>