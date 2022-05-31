<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
        <div style="margin-top: 10px;">
            <el-select v-model="type_selected" placeholder="选择检索项" style="width: 150px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <!-- 根据检索项不同，会出现不同搜索框 -->
            <el-input v-if="type_selected == 'realName'" @change="set_value" @keyup.enter.native="getData"
                v-model="select.name_selected" placeholder="搜索姓名" style="width: 150px;margin-left: 20px;"></el-input>
            <el-input v-if="type_selected == 'stid'" @change="set_value" @keyup.enter.native="getData"
                v-model="select.stid_selected" placeholder="搜索工号" style="width: 150px;margin-left: 20px;"></el-input>
            <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;height:30px;padding-top:8px;"
                @click="getData"></el-button>
            <el-button type="primary" icon="el-icon-close" style="margin-left: 20px;height:30px;padding-top:8px;"
                @click="cleanSelected"></el-button>
        </div>


        <div>
            <el-table ref="multipleTable" :data="info" size="small" stripe tooltip-effect="dark"
                style="width: 100%;margin-top: 30px;cursor:pointer" border @row-click="checkDetails">
                <el-table-column prop="realName" label="姓名" :formatter="if_null" show-overflow-tooltip width="150" align="center">
                </el-table-column>
                <el-table-column prop="ranks" label="职称" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="department" label="学院" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click.stop="checkDetails(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>
        <div>
            <el-pagination style="margin-top: 60px;" @size-change="size = $event,getData()"
            @current-change="getData()" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
            :page-size.sync="size" layout="total, sizes, prev, pager, next, jumper" :total.sync="size_total">
        </el-pagination>
        </div>

    </div>
    </div>
</template>

<script>
    export default {
        name:"adminTeaOuter",
        data() {
            return {
                info: [], //获取到的表格数据
                options: [{ //条件检索选项
                    value: "realName",
                    label: "姓名"
                }, {
                    value: "stid",
                    label: "工号"
                },], //下拉框的选项
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
                size: 30, //当前一页条目数
                select: { //下拉框选择的值
                    name_selected: '', //输入姓名
                    stid_selected: '', //输入学号
                },
                type_selected: '', //选择的词条,附加在获取信息上做到条件搜索
                value_selected: '', //在下拉框的值确定到该变量上，便于搜索
            }
        },
        methods: {
            getData() { //获取表格数据   //dateStr.match
                this.axios.get('/users/teacher/info/', {
                    params: {
                        start: this.current_page,
                        size: this.size,
                        type_name: this.type_selected,
                        type_value: this.value_selected,
                        choice: 1
                    },
                })
                    .then(response => {
                        this.info = response.data.data.list
                        this.pages_total = response.data.data.pages;
                        this.size_total = response.data.data.total;
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },

            set_value() { //条件搜索确定值的时候，将值固定到一个变量，用于搜索
                Object.keys(this.select).forEach(res => {
                    if (this.select[res] != '') {
                        this.value_selected = this.select[res]
                    }
                })
            },
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },

            cleanSelected() { //清除已经选定的搜索条件,再次搜索
                Object.keys(this.select).forEach(res => {
                    this.select[res] = ''
                })
                this.type_selected = ''
                this.value_selected = ''
                this.getData()
            },
            checkDetails(row) {
                this.$router.push({
                    path: '/user_info',
                    query: {
                        user_id: row.user_id,
                        role: 'tea',
                        n: 2
                    }
                })
            },
        },
        created() {
            this.getData();
        },
    }
</script>

<style scoped lang="scss">

</style>