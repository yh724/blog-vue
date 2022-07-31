<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="always" style="height: 90px">
                    <el-col :span="8">
                        <i class="iconfont icon-fangwenliang" style="font-size: 48px"></i>
                    </el-col>
                    <el-col :span="4">
                        &nbsp;
                    </el-col>
                    <el-col :span="12">
                        <div>
                            今日访问量：
                        </div>
                        <div style="margin-top: 12px">
                            {{visit}}
                        </div>
                    </el-col>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="height: 90px">
                    <el-col :span="8">
                        <i class="iconfont icon-bianjiwenzhang_huaban" style="font-size: 48px"></i>
                    </el-col>
                    <el-col :span="4">
                        &nbsp;
                    </el-col>
                    <el-col :span="12">
                        <div>
                            文章量：
                        </div>
                        <div style="margin-top: 12px">
                            {{articleCount}}
                        </div>
                    </el-col>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="height: 90px">
                    <el-col :span="8">
                        <i class="iconfont icon-pinglun" style="font-size: 48px"></i>
                    </el-col>
                    <el-col :span="4">
                        &nbsp;
                    </el-col>
                    <el-col :span="12">
                        <div>
                            评论量：
                        </div>
                        <div style="margin-top: 12px">
                            {{remarkCount}}
                        </div>
                    </el-col>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" style="height: 90px">
                    <el-col :span="8">
                        <i class="iconfont icon-39" style="font-size: 48px"></i>
                    </el-col>
                    <el-col :span="4">
                        &nbsp;
                    </el-col>
                    <el-col :span="12">
                        <div>
                            分类条数：
                        </div>
                        <div style="margin-top: 12px">
                            {{typeCount}}
                        </div>
                    </el-col>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="always">
                    <div id="visit" style="height:350px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        <span style="font-weight: bolder;font-size: large">热门文章</span>
                    </div>
                    <el-table
                            :data="topArticle"
                            style="width: 100%;">
                        <el-table-column
                                label="#"
                                type="index"
                                :index="(index)=>{return index+1}"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="标题"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="访问量">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card shadow="always">
                    <i class="el-icon-data-line"></i>
                    <div>功能1</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <i class="el-icon-data-line"></i>
                    <div>功能2</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <i class="el-icon-data-line"></i>
                    <div>功能3</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <i class="el-icon-data-line"></i>
                    <div>功能4</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">

                    <i class="el-icon-data-line"></i>
                    <div>功能5</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <i class="el-icon-data-line"></i>
                    <div>功能6</div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "DashBoard",
        methods: {
            visitCount() {
                var myChart = this.$echarts.init(document.getElementById('visit'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '访问人数（近7日）'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line',
                            smooth: true
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        data() {
            return {
                topArticle: [
                    {
                        name: '斗罗大陆',
                        count: '10w+'
                    },
                    {
                        name: '斗破苍穹',
                        count: '10w+'
                    },
                    {
                        name: '吞噬星空',
                        count: '10w+'
                    },
                    {
                        name: '一年永恒',
                        count: '10w+'
                    },
                    {
                        name: '完美世界',
                        count: '10w+'
                    }
                ],
                visit: 300,
                articleCount: 255,
                typeCount: 7,
                remarkCount: 999
            }
        },
        mounted() {
            this.visitCount();
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
</style>