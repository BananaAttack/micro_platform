<template>
  <div style="margin-top: 30px;margin-left: 50px;">
    <p style="font-size: 24px;margin-top: 30px;font-family: arial;color: #1f2f3d;font-weight: 400;">修改个人信息</p>
    <div style="margin-top: 30px;margin-left: 250px;">
      <el-form :model="form" width="500px">
        <el-form-item label="工号" style="margin-left:28px ;">
          <el-input v-model="form.stid" autocomplete="off" style="width: 400px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName" autocomplete="off" style="width: 400px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="margin-left:28px ;">
          <p>{{form.sex}}</p>
        </el-form-item>
        <el-form-item label="所属院系">
          <el-select v-model="form.department" placeholder="选择所属院系" style="width: 400px;">
            <el-option v-for="item in options_department" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" style="margin-left:28px ;">
          <el-radio v-model="form.ranks" label="助教">助教</el-radio>
          <el-radio v-model="form.ranks" label="讲师">讲师</el-radio>
          <el-radio v-model="form.ranks" label="副教授">副教授</el-radio>
          <el-radio v-model="form.ranks" label="教授">教授</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
            style="width:400px ;" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入职年份">
          <el-date-picker v-model="form.entry_year" type="year" placeholder="选择年份" value-format="yyyy"
            style="width:400px ;" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" style="margin-left:16px ;">
          <el-input v-model="form.phone" autocomplete="off" style="width: 400px;display: inline-block;" @change="checkPhone"></el-input>
          <p style="color: #DD6161;display: inline-block;" v-if="!phone_right">手机号码格式不正确</p>
        </el-form-item>
        <el-form-item label="邮箱" style="margin-left:28px ;">
          <el-input v-model="form.email" autocomplete="off" style="width: 400px;display: inline-block;" @change="checkEmail"></el-input>
          <p style="display: inline-block;color: #DD6161;" v-if="!email_right">邮箱地址格式不正确</p>
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
    <div style="margin-top:50px;margin-left: 480px; margin-bottom: 100px;">
      <el-button @click="">重置</el-button>
      <el-button type="primary" @click="changeTeacher" style="margin-left: 80px;">确 定</el-button>
      <!-- info作为表格数据源同步到表格改动 -->
    </div>

  </div>
</template>

<script>
  export default {
    name:"teaModifyInfo",
    data() {
      return {
        user_id: this.$store.getters.user_id,
        options_department: [],
        options_ranks: [{ //下拉框职称
          value: "1",
          label: "助教"
        }, {
          value: "2",
          label: "讲师"
        }, {
          value: "3",
          label: "副教授"
        }, {
          value: "4",
          label: "教授"
        }],
        imageUrl: '', //存放图片地址,暂时未实现图片上传功能
        phone_right: true, //检测手机号码格式,默认正确
        email_right: true, //检测邮箱格式，默认正确
        form: { //存放修改或者添加的学教师信息，每次关闭对话框都会清空
          stid: '',
          realName: '',
          sex: '',
          department: '',
          ranks: '',
          degree: '',
          major: '',
          birth: '',
          entry_year: '',
          phone: '',
          email: '',
          user_id: '', //用户id，仅用于修改信息时使用，不会显示在表格中
          picture: "", //暂时接口未要求
        },
        imgChange: false
      }
    },
    methods: {
      getData() {
        // console.log(this.user_id)
        this.axios.get('/user/teacher/info/', {
          params: {
            user_id: this.user_id
          },
          
        })
          .then(response => {
            this.form = response.data.data
            this.form.entry_year = this.form.entry_year.toString()//年份转化为字符串才能正常显示
            console.log(this.form)
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      goBack() {
        this.$router.push('/')
      },
      turnback() {
        this.$router.go(-1)
      },
      getDepartment() {
        this.axios.get('/opt/option/items', {
          params: {
            type: "department"
          },
          
        })
          .then(response => {
            this.options_department = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      changeTeacher(rows) { //修改教师信息
        let ready_to_post = true
       /*  Object.keys(this.form).forEach(res => {
          if (this.form[res] == null) {
            ready_to_post = false
            console.log(res)
          }
        }) */
        if (ready_to_post && this.phone_right && this.email_right) {
          this.axios.put('/user/info', {
            user_id: this.user_id,
            stid: this.form.stid,
            realName: this.form.realName,
            sex: this.form.sex,
            major: this.form.major,
            phone: this.form.phone,
            email: this.form.email,
            picture: this.form.picture,
            department: this.form.department,
            ranks: this.form.ranks,
            degree: this.form.degree,
            type:"teacher"
          }, {
            
          })
            .then(response => {
              if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                // Object.keys(rows[this.form.index]).forEach(res=>{ //rows为传入的表格数据源,采用foreach优化代码
                //   rows[this.form.index][res] = this.form[res]
                // })
                //提示成功并跳转回之前页面
                console.log(this.form)
              }
            })
            .catch(response => { });
          if (this.imgChange) {
            this.axios.post('/user/picture?user_id=' + this.user_id,
              this.formData)
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
    },
    created() {
      this.getData()
      this.getDepartment()
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