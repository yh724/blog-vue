<template>
    <div>
        <el-container>
            <el-aside>
                <el-image
                        style="height: 240px"
                        :src="require('@/assets/logo.png')"
                ></el-image>
                <el-menu
                        router
                        :default-active="$route.path">
                    <el-menu-item v-for="item in $router.options.routes[2].children" :index="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container style="background: #dae3e6;">
                <el-header>
                    <div style="width: 1215px;height: 60px">
                        <!--<el-row type="flex" class="row-bg" justify="end">
                            <el-col :span="6">
                                <el-col :span="6">
                                </el-col>
                                <el-col :span="12">

                                </el-col>
                                <el-col :span="18">

                                </el-col>
                                <el-col :span="24">

                                </el-col>
                            </el-col>
                        </el-row>-->
                        <el-row>
                            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
                            <el-col :span="18"><div class="grid-content bg-purple"></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                        </el-row>
                    </div>
                       <!-- <el-row type="flex" justify="end" style="align-items: center">
                            <el-col :span="1">admin</el-col>
                            <el-col :span="2"><el-avatar :size="50" :src="avatorURL"/></el-col>
                            <el-col :span="3" style="font-size: 36px"><i class="el-icon-s-promotion" style="color: #42b983"></i></el-col>
                            <el-col :span="4" style="font-size: 36px"><i class="el-icon-info" style="color: #409EFF"></i></el-col>
                            <el-col :span="5" style="font-size: 36px"><i class="el-icon-paperclip"></i></el-col>
                            <el-col :span="6" style="font-size: 36px"><i class="el-icon-s-home" style="color: #F56C6C"></i></el-col>
                        </el-row>-->
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import avatorURL from '../assets/avatar.jpg'

    export default {
        name: "Menu.vue",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        data() {
            return {
                avatorURL: avatorURL
            }
        }
    }
</script>

<style scoped>
    .el-aside {
        width: 200px;
        height: 745px;
    }

    .el-header {
        margin-top: 20px;
    }

</style>