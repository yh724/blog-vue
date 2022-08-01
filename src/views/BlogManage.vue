<template>
    <div>
      <div style="font-size: xx-large;font-weight: bolder">
        <i class="el-icon-edit-outline"></i>
        博客管理
      </div>
      <el-divider>

      </el-divider>
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
              <el-button type="primary">
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
            property="articleTitle"
            label="标题"
            width="240">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="作者"
            width="100">
        </el-table-column>
        <el-table-column
            prop="articleSort"
            label="分类"
            width="100">
        </el-table-column>
        <el-table-column
            prop="articleLabel"
            label="标签"
            width="80">
          <template slot-scope="scope">
              <el-tag type="warning">{{scope.row.articleLabel}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="articleViews"
            label="浏览量"
            width="80">
        </el-table-column>
        <el-table-column
            prop="articleCommentCount"
            label="评论数"
            width="80">
        </el-table-column>
        <el-table-column
            prop="articleLikeCount"
            label="点赞数"
            width="80">
        </el-table-column>
        <el-table-column
            prop="articleDate"
            label="发布时间"
            width="160">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="deleteOneArticle(scope.$index,scope.row.articleId)">删除</el-button>
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
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        deleteOneArticle(index,id) {
          const _this = this;
          axios.delete("/articles/"+id).then(function (res){
              if(res.data === 'success'){
                _this.$message({
                  message: '删除成功！',
                  type: "success"
                })
              }else {
                _this.$message({
                  message: '删除失败！',
                  type: "error"
                })
              }
              page(index);
          })
        },
        page(currentPage){
          const _this = this;
          axios.get("/articles/"+currentPage+"/"+this.pageSize).then(function (res){
            _this.total = res.data.total;
            _this.articlesTable = res.data.articlesList;
          })
        }
      },
      data() {
        return {
          articlesTable: [{
            articleId:'',
            articleTitle: '21天学会Java：从入门到放弃',
            userId: '王建国',
            articleSort: '后端开发',
            articleLabel: 'Java',
            articleViews: 123,
            articleCommentCount: 78,
            articleLikeCount: 99,
            articleDate: '2022-08-01 10:39:22'
          },{
            articleId: '',
            articleTitle: '21天学会Java：从入门到放弃',
            userId: '王建国',
            articleSort: '后端开发',
            articleLabel: 'Java',
            articleViews: 123,
            articleCommentCount: 78,
            articleLikeCount: 99,
            articleDate: '2022-08-01 10:39:22'
          }],
          currentPage: 1,
          pageSize: 5,
          total: 1000,
          searchData: ''
        }
      },
      created() {
        this.page(1);
      }

    }
</script>

<style scoped>
.el-divider{
  background: #55a532;
}
</style>