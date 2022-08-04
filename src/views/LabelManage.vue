<template>
  <div>
    <div style="font-size: xx-large;font-weight: bolder">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-biaoqian"></use>
      </svg>
      标签管理
    </div>
    <el-divider/>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="16">
                <div style="font-size: x-large;font-weight: bolder;margin-top: 5px">
                  编辑标签
                </div>
              </el-col>
              <el-col :span="4">
                <el-button @click="resetForm('labelForm')">重置</el-button>
              </el-col>
              <el-col :span="4">
                <el-button @click="editTag" type="primary">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-form label-position="top" label-width="80px" ref="labelForm" :model="labelForm">
              <el-form-item label="标签名称" prop="labelName">
                <el-input v-model="labelForm.labelName"></el-input>
              </el-form-item>
              <el-form-item label="标签别名" prop="labelAlias">
                <el-input v-model="labelForm.labelAlias"></el-input>
              </el-form-item>
              <el-form-item label="标签颜色" prop="labelColor">
                <el-col :span="20">
                  <el-input v-model="labelForm.labelColor"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-color-picker v-model="labelForm.labelColor"></el-color-picker>
                </el-col>
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
          <div>
            <el-tag
                v-for="tag in tags"
                :key="tag.labelName"
                closable
                @close="deleteTag(tag)"
                @click="readTag(tag)"
                effect="dark"
                :color="tag.labelColor">
              <span style="color: white">{{ tag.labelName }}</span>

            </el-tag>
            <el-input
                style="width: 90px"
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="insertTag"
                @blur="insertTag"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  created() {
    this.page();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    page() {
      const _this = this;
      axios.get('/labels').then(function (res) {
        _this.tags = res.data;
      })
    },

    deleteTag(tag) {
      /* 删除标签，刷新页面 */
      const _this = this;
      axios.delete('/labels/' + tag.labelId).then(function (res) {
        _this.responseHandler(res.data);
      })
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    responseHandler(response) {
      if (response.message.typeCode === '200') {
        this.$message({
          type: 'success',
          message: response.message.message
        })
      } else {
        this.$message({
          type: 'error',
          message: response.message.message
        })
      }
      this.page();
    },

    insertTag() {
      let name = this.inputValue;
      const _this = this;
      if (name) {
        /* this.dynamicTags.push(inputValue); */
        /* 添加标签，刷新页面 */
        axios.post('/labels/' + name).then(function (res) {
          _this.responseHandler(res.data);
        })
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    readTag(tag) {
      this.labelForm.labelId = tag.labelId;
      this.labelForm.labelName = tag.labelName;
      this.labelForm.labelAlias = tag.labelAlias;
      this.labelForm.labelColor = tag.labelColor;
    },
    editTag() {
      const _this = this;
      axios.put('/labels', this.labelForm).then(function (res) {
        _this.responseHandler(res.data);
        _this.readTag('labelForm')
      })

    }
  },
  data() {
    return {
      labelForm: {
        labelId: '',
        labelName: '',
        labelAlias: '',
        labelColor: ''
      },
      labelsTable: [],
      tags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
};
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.el-card {
  height: 530px;
  overflow-y: auto;
}

.el-divider {
  background: #55a532;
}

.el-tag {
  margin: 5px;
}
</style>