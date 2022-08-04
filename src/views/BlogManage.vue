<template>
  <div>
    <div style="font-size: xx-large;font-weight: bolder">
      <i class="el-icon-edit-outline"></i>
      博客管理
    </div>
    <el-divider>

    </el-divider>

    <el-dialog
        title="添加博客"
        :visible.sync="saveDialog"
        fullscreen
        width="100%">
      <el-form :model="saveForm" :rules="rules" ref="saveForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="articleTitle">
              <el-input v-model="saveForm.articleTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="分类" prop="articleSortId">
              <el-select v-model="saveForm.articleSortId" placeholder="请选择博客分类">
                <el-option
                    v-for="item in sortList"
                    :key="item.sortId"
                    :label="item.sortName"
                    :value="item.sortId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="标签" prop="articleLabelIds">
              <el-popover
                  placement="right"
                  trigger="click">
                <el-transfer
                    v-model="saveForm.articleLabelIds"
                    :button-texts="['删除', '添加']"
                    :titles="['标签池','选中的标签']"
                    :props="{
                      key: 'labelId',
                      label: 'labelName'
                    }"
                    :data="labelData">
                </el-transfer>
                <el-button slot="reference" type="success">点我选择标签</el-button>
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容" prop="articleContent">
          <mavon-editor
              ref="md"
              placeholder="请输入文档内容..."
              :boxShadow="true"
              style="z-index:1;border: 1px solid #d9d9d9;height:50vh"
              v-model="saveForm.articleContent"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="submitForm('saveForm')">立即添加</el-button>
           <el-button @click="resetForm('saveForm')">重置</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="编辑博客"
        :visible.sync="updateDialog"
        fullscreen
        width="100%">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="articleTitle">
              <el-input v-model="updateForm.articleTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="分类" prop="articleSortId">
              <el-select v-model="updateForm.articleSortId" placeholder="请选择博客分类">
                <el-option
                    v-for="item in sortList"
                    :key="item.sortId"
                    :label="item.sortName"
                    :value="item.sortId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签" prop="articleLabelIds">
              <el-popover
                  placement="right"
                  trigger="click">
                <el-transfer
                    v-model="updateForm.articleLabelIds"
                    :button-texts="['删除', '添加']"
                    :titles="['标签池','选中的标签']"
                    :props="{
                      key: 'labelId',
                      label: 'labelName'
                    }"
                    :data="labelData">
                </el-transfer>
                <el-button slot="reference" type="success">点我选择标签</el-button>
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容" prop="articleContent">
          <mavon-editor
              ref="md"
              placeholder="请输入文档内容..."
              :boxShadow="true"
              style="z-index:1;border: 1px solid #d9d9d9;height:50vh"
              v-model="updateForm.articleContent"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="submitForm('updateForm')">立即修改</el-button>
           <el-button @click="resetForm('updateForm')">重置</el-button>
      </span>
    </el-dialog>

    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="3">
        <el-input placeholder="请输入博客名"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入作者名"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入分类名"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入标签名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
            v-model="searchData"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="end">
          <el-col :span="6">
            <el-button type="primary">
              <i class="el-icon-search">搜索</i>
            </el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="saveDialog=true">
              <i class="el-icon-edit">添加博客</i>
            </el-button>
          </el-col>
          <el-col :span="7">
            <el-button type="danger">
              <i class="el-icon-delete">删除选中</i>
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table
        ref="multipleTable"
        :data="articlesTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="编号"
          type="index"
          :index='(index)=>{return (index+1) + (this.currentPage-1)*this.pageSize}'
          width="63">
      </el-table-column>
      <el-table-column
          property="article.articleTitle"
          label="标题"
          width="240">
      </el-table-column>
      <el-table-column
          prop="user.userName"
          label="作者"
          width="100">
      </el-table-column>
      <el-table-column
          prop="articleSort.sortName"
          label="分类"
          width="100">
      </el-table-column>
      <el-table-column
          prop="articleLabels"
          label="标签"
          width="280">
        <template slot-scope="scope">
          <el-tag
              v-for="label in scope.row.articleLabels"
              :color="label.labelColor"
              effect="dark">
              <span style="color: white">
                {{ label.labelName }}
              </span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="article.articleViews"
          label="浏览量"
          width="80">
      </el-table-column>
      <el-table-column
          prop="article.articleCommentCount"
          label="评论数"
          width="80">
      </el-table-column>
      <el-table-column
          prop="article.articleLikeCount"
          label="点赞数"
          width="80">
      </el-table-column>
      <el-table-column
          prop="article.articleDate"
          label="发布时间"
          width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="editArticle(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              slot="reference"
              @click="deleteOneArticle(scope.$index,scope.row.article.articleId)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-col :span="8">
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
  </div>
</template>

<script>
export default {
  name: "BlogManage",
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    editArticle(index, row) {
      this.updateForm.articleId = row.article.articleId;
      this.updateForm.articleTitle = row.article.articleTitle;
      this.updateForm.articleSortId = row.articleSort.sortId;
      this.updateForm.articleContent = row.article.articleContent;
      let arr = [];
      row.articleLabels.forEach(e => arr.push(e.labelId))
      this.updateForm.articleLabelIds = arr;
      console.log(this.updateForm)
      this.updateDialog = true;
    },

    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'saveForm': {
              _this.saveDialog = false;
              axios.post('/articles', this.saveForm).then(function (res) {
                if (res.data === 'success') {
                  _this.$message({
                    message: '添加成功！',
                    type: 'success'
                  })
                  _this.saveForm = {};
                  _this.labelData = [];
                  _this.getLabelList();
                  _this.page(1)
                } else {
                  _this.$message({
                    message: '添加失败！',
                    type: 'error'
                  })
                }
              })
              break;
            }
            case 'updateForm': {
              _this.updateDialog = false;
              axios.put('/articles', this.updateForm).then(function (res) {
                if (res.data === 'success') {
                  _this.$message({
                    message: '修改成功！',
                    type: 'success'
                  })
                  _this.page(1);
                  _this.labelData = [];
                  _this.getLabelList();
                } else {
                  _this.$message({
                    message: '修改失败！',
                    type: 'error'
                  })
                }
              })

            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    deleteOneArticle(index, id) {
      const _this = this;
      axios.delete("/articles/" + id).then(function (res) {
        if (res.data === 'success') {
          _this.$message({
            message: '删除成功！',
            type: "success"
          })
          _this.page(1);
        } else {
          _this.$message({
            message: '删除失败！',
            type: "error"
          })
        }
      })
    },
    page(currentPage) {
      const _this = this;
      axios.get("/articles/" + currentPage + "/" + this.pageSize).then(function (res) {
        _this.total = res.data.total;
        _this.articlesTable = res.data.articlesList;
      })
    },

    getLabelList() {
      const _this = this;
      axios.get('/labels').then(function (res) {
        _this.labelData = res.data;
      })
    },

    getSortList() {
      const _this = this;
      axios.get('/sorts').then(function (res) {
        _this.sortList = res.data;
      })
    }
  },
  data() {
    return {
      articlesTable: [{
        article: {
          articleId: '',
          userId: '王建国',
          articleTitle: '21天学会Java：从入门到放弃',
          articleContent: '',
          articleViews: 123,
          articleCommentCount: 78,
          articleLikeCount: 99,
          articleDate: '2022-08-01 10:39:22',
        },
        user: {},
        articleSort: {},
        articleLabels: [],
      }],
      currentPage: 1,
      pageSize: 5,
      total: 1000,
      searchData: '',
      saveDialog: false,
      updateDialog: false,

      /**
       * 添加博客对话框的表单数据项
       * **/
      saveForm: {
        userId: '',
        articleTitle: '',
        articleSortId: '',
        articleLabelIds: [],
        articleContent: ''
      },

      /**
       * 编辑博客对话框的表单数据项
       * **/
      updateForm: {
        articleId: '',
        userId: '',
        articleTitle: '',
        articleSortId: '',
        articleLabelIds: [],
        articleContent: ''
      },

      rules: {
        articleTitle: [
          {required: true, message: '请输入博客标题', trigger: 'blur'}
        ],
        articleSort: [
          {required: true, message: '请选择博客分类', trigger: 'change'}
        ],
        articleLabel: [
          {required: true, message: '请添加博客标签', trigger: 'change'}
        ],
        articleContent: [
          {required: true, message: '请填写博客内容', trigger: 'blur'}
        ]
      },
      /* 查询到的label列表 */
      labelData: [],
      sortList: {}
    }
  },
  created() {
    this.page(1);
    this.getLabelList();
    this.getSortList();
    this.saveForm.userId = 1;
    this.updateForm.userId = 1;
  }

}
</script>

<style scoped>
.el-divider {
  background: #55a532;
}

.el-tag {
  margin: 5px;
}
</style>