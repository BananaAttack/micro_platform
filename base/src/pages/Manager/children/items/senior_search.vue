<template>
  <div>
    <el-form :inline="true" :model="selected">
      <el-form-item v-for="formitem in base_data" v-if="formitem.en">
        <el-select :placeholder="formitem.ch" v-model="selected[formitem.en]" @change="HandleChecked($event, item.en)">
          <el-option v-for="item in options[formitem.en]" :label="item.name? item.name : item"
                     :value="item.name? item.name : item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input placeholder="搜索姓名" v-model="selected.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="搜索作品名" v-model="selected.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-popover
          placement="bottom"
          width="600"
          popper-class="me"
          trigger="hover"
          title="高级筛选">
          <el-form :inline="true">
            <el-form-item label="应用对象">
              <el-checkbox v-model="selected.host" label="1">主持人</el-checkbox>
              <el-checkbox v-model="selected.partner" label="2">成员</el-checkbox>
            </el-form-item>
            <el-form-item label="完整度">
              <el-checkbox v-model="selected.complete" label="1">完整</el-checkbox>
              <el-checkbox v-model="selected.incomplete" label="2">不完整</el-checkbox>
            </el-form-item>
            <el-form-item label="所学专业">
              <el-select placeholder="所有专业" v-model="selected.achieve_year_single">
                <el-option v-for="item in options[base_data[0].en]" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在班级">
              <el-select placeholder="所有班级" v-model="selected.achieve_year_single">
                <el-option v-for="item in options[base_data[0].en]" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button slot="reference">
            <el-icon name="search"></el-icon>
          </el-button>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "senior_search",
  data() {
    return {
      visible: false,
    }
  },
  props: [
    "options",
    "selected",
    "base_data"
  ],
  methods:{
    HandleChecked(value, type, item_2) {
      if (type === "competition_type") {
        let mytype = type.slice(0, -5)
        this.axios
          .get("/opt/option/getTypeByProductType?productType=" + value + "&type=" + mytype, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.options.work_type = response.data.data;
          })
          .catch(function (response) {
          });
      }
      let checkedCount = value.length;
      this.checkAll[type] =  this.selected[type]===""
      this.isInd[type] = this.selected[type]===""
      this.get_info();
    },
    async get_info() {
      Vue.set(this.selected, "achieve_year_single", this.achieve_year_single);
      Vue.set(this.selected, "achieve_year_start", this.achieve_year_start);
      Vue.set(this.selected, "achieve_year_end", this.achieve_year_end);
      this.selected.start = this.current_page;
      // console.log("这是selected start", this.selected);
      let res = await this.$api_query.admin_search_competition(this.selected);
      this.info = res.list;
      this.pages_total = res.pages;
      this.size_total = res.total;
      if (this.info) {
        Object.keys(this.info).forEach((res) => {
          this.info[res].writer = this.info[res].students[0].realName;
        });
      }
    },
  }
}
</script>

<style scoped>

</style>
