<template>
  <div style="margin-top: 30px;margin-left: 50px;">
      <p style="font-size: 24px;margin-top: 30px;font-family: arial;color: #1f2f3d;font-weight: 400;">修改个人信息</p>
    <div style="margin-top: 30px;margin-left: 250px;">
      <el-form :model="form" width="500px">
        <el-form-item label="学号" style="margin-left: 28px;">
          <el-input v-model="form.stid" autocomplete="off" style="width: 400px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName" autocomplete="off" style="width: 400px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="margin-left: 28px;">
          <p>{{form.sex}}</p>
          <!-- <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio> -->
        </el-form-item>
        <el-form-item label="专业" style="margin-left: 28px;width: 600px;">
          <!-- 当选项改变，会对班级下拉框做一个筛选 -->
          <el-radio v-model="form.major" :label="item.name" @change="getClass" v-for="item in options_major" :key="item.name">{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item label="班级" style="margin-left: 28px;">
          <!-- 当没有选专业，下拉框为总数据，选完专业后显示筛选过的数据 -->
          <el-select v-model="form.stu_class" placeholder="选择班级" style="width: 400px;">
            <el-option v-for="item in options_class" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
            style="width: 400px;" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" style="margin-left: 15px;">
          <el-input v-model="form.phone" autocomplete="off" style="width: 400px;" @change="checkPhone"></el-input>
          <p style="float: right;margin-right: 300px;color: #DD6161;" v-if="!phone_right">手机号码格式不正确</p>
        </el-form-item>
        <el-form-item label="邮箱" style="margin-left: 28px;">
          <el-input v-model="form.email" autocomplete="off" style="width: 400px;" @change="checkEmail"></el-input>
          <p style="float: right;margin-right: 300px;color: #DD6161;" v-if="!email_right">邮箱地址格式不正确</p>
        </el-form-item>
        <el-form-item label="一寸照" :v-if="form.picture" style="margin-left: 15px;">
          <img :src="form.picture" alt="" style="width: 150px;height: 150px;">
        </el-form-item>
        <el-form-item label="一寸照上传">
          <el-upload class="avatar-uploader" action="" :http-request="onChange" :show-file-list="false"
            :on-progress="onProgress" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:50px;margin-left: 300px;margin-bottom: 100px;">
      <el-button @click="replace;" style="width: 120px;">重置</el-button>
      <el-button type="primary" @click="changeStudent" style="margin-left: 80px;width: 120px;">确 定</el-button>
      <!-- info作为表格数据源同步到表格改动 -->
    </div>

  </div>
</template>

<script>
  export default {
    name:"stuModifyInfo",
    data() {
      return {
        user_id: this.$store.getters.user_id,
        options_class: [], //下拉框班级
        options_major:[], //专业
        imageUrl: '', //存放图片地址,暂时未实现图片上传功能
        phone_right: true, //检测手机号码格式,默认正确
        email_right: true, //检测邮箱格式，默认正确
        form: { //存放修改或者添加的学生信息，每次关闭对话框都会清空
          stid: '',
          realName: '',
          sex: '',
          major: '',
          education: '',
          stu_class: '',
          birth: '',
          enter_year: '',
          phone: '',
          email: '',
          picture: '',
        },
        formData: "",
        imgChange: false,
      }
    },
    methods: {
      async getData() {
        await this.axios.get('/user/stu/info/', {
          params: {
            user_id: this.user_id
          },
          
        })
          .then(response => {
            this.form = response.data.data
            this.form.enter_year = this.form.enter_year.toString()
            // console.log("old  "+this.form)
          })
          .catch(
            function (response) {
              console.log(response)
            });
        // console.log("class"+this.stu_class)
      },
      goBack() {
        this.$router.push('/')
      },
      turnback() {
        this.$router.go(-1)
      },
      replace() {
        this.getData()
        this.getClass()
        this.options_class_now = this.options_class
        // console.log("options_class_now"+this.options_class_now)
      },
      changeStudent(rows) { //修改学生信息
        let ready_to_post = true
        Object.keys(this.form).forEach(res => {
          // if(this.form[res] == '' || this.form[res] == null){ 暂时没有完成添加图片功能，所以先不做null的检测
          if (this.form[res] == null) {
            ready_to_post = false
            console.log(res)
          }
        })
        if (ready_to_post && this.phone_right && this.email_right) {
          this.axios.put('/user/info', {
            user_id: this.user_id,
            stid: this.form.stid,
            realName: this.form.realName,
            sex: this.form.sex,
            major: this.form.major,
            education: this.form.education,
            stu_class: this.form.stu_class,
            birth: this.form.birth,
            enter_year: this.form.enter_year,
            phone: this.form.phone,
            email: this.form.email,
            picture: this.form.picture,
            type:"student"
          }, {
            
          })
            .then(response => {
              if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                // Object.keys(rows[this.form.index]).forEach(res=>{ //rows为传入的表格数据源,采用foreach优化代码
                //   rows[this.form.index][res] = this.form[res]
                // })
                //提示成功并跳转回之前页面
                console.log("new", this.form)

              }
            })
            .catch(response => { });
          if (this.imgChange) {
            this.axios.post('/user/picture?user_id=' + this.user_id,
              this.formData,
              {
                headers: {
                  'Token': this.Token
                },
              })
          }
          this.turnback()
        } else {
          this.$message.error('表单填写有误');
        }

      },
      onChange(file) { //修改学生信息——上传照片
        this.formData = new FormData()
        this.formData.append('file', file.file)
        this.imgChange = true
        // console.log("oldpic"+this.form.picture)
        this.form.picture = URL.createObjectURL(file.file);
        // console.log("new"+this.form.picture)
      },
      onProgress() {
        this.$message.info("正在上传");
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      checkPhone() { //检测手机号码格式是否正确
        if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
          this.phone_right = false
        } else {
          this.phone_right = true
        }
      },
      checkEmail() { //检测邮箱格式是否正确
        if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.form.email))) {
          this.email_right = false
        } else {
          this.email_right = true
        }
      },
      async getClass() { //根据下拉选项获取班级信息
        let search = this.form.major
        if (search == "") search = "all"
        // console.log("search="+search)
        await this.axios.get('/opt/class/classes', {
          params: {
            major: search
          },
          
        })
          .then(response => {
            this.options_class = response.data.data
            // console.log(this.options_class)
          })
          .catch(
            function (response) {
              console.log(response)
            });
        // console.log(this.options_class)
      },
      getMajor() { //根据下拉选项获取班级信息
        this.axios.get('/opt/option/items?type=major', {
          
        })
          .then(response => {
            this.options_major = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
    },
    async created() {
      await this.getData()
      console.log("old", this.form)
      await this.getClass()
      await this.getMajor()
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>