<template>
    <div id="root">
        <el-row type="flex" justify="start">
            <el-col :span="6">
                <div id="p_card">
                    <el-card id="card">
                        <div style="text-align: center">
                            <span style="font-weight: bolder;font-size: xx-large">后台管理系统&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <br><br><br><br>
                        <div>
                            <el-form :model="loginForm"  ref="loginForm" label-width="auto">
                                <el-form-item label="用户名">
                                    <el-col :span="18">
                                        <el-input type="password" v-model="loginForm.username"></el-input>
                                    </el-col>
                                </el-form-item>
                                <br><br><br><br>
                                <el-form-item label="密码">
                                    <el-col :span="18">
                                        <el-input type="password" v-model="loginForm.password"></el-input>
                                    </el-col>
                                </el-form-item>
                                <br><br><br><br>
                                <el-form-item>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-button @click="resetForm('ruleForm')">注册</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: 'Login',
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        },
        data() {
            return{
                loginForm: {
                    username:'',
                    password:''
                }
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    div {
        position: absolute;
        height: 100%;
        width: 100%;

    }

    #card {
        width: 135%;
        height: 50%;
        background-color: rgba(233,233,233,0.5);
    }

    #p_card {
        display: flex;
        align-items: center; /*侧轴上居中*/
        margin-left: 50%;
    }

    #root {
        height: 745px;
        width: 1536px;
        background-image: url("../assets/login.png");
        background-repeat: no-repeat;
        background-size: 100%;
    }
</style>