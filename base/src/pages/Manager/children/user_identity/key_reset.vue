<template>
  <div class="main">
    <div class="title">
      <span style="font-size:24px;font-weight: bolder">生成重置密钥</span><br/><br/>
      <span style="font-size:22px">检索用户 支持姓名模糊查询</span><br/>
    </div>
    <br/>
    <el-input v-model="keyword" class='input' @input="inputchange" :disabled="able"></el-input>
    <el-button type='text' class="changebutton" @click="changekeyword" v-if="able===true">
      修改
    </el-button>
    <div v-if='list_show' class='list_frame'>
      <ul style="text-align:left">
        <ol v-for="(item,index) in list" :key="item.user_id" :class="{active: currentindex===index}"
            @click="objectselected(index,item)">
          {{item.realName+' '+item.stid+' '+item.sex}}
        </ol>
      </ul>
    </div>
    <el-button class='resetbutton' @click="resetkey" v-if="list_show===false">
      生成重置密钥
    </el-button>

    <el-dialog
      title="密码重置密钥"
      :visible.sync="dialogVisible"
      width="30%">
      <span class='dialog_text'>重置密匙为：</span><span class='key'>{{this.key}}</span><br/>
      <span class='dialog_text'>本密钥将在使用1次后或再次生成新密钥时失效</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>


  </div>

</template>

<script>
  export default {
    name: "key_reset",
    data() {
      return {
        key: '',
        dialogVisible: false,
        keyword_backup: '',
        afterselect: false,
        userid: '',
        currentindex: '',
        keyword: '',
        able: false,
        list_show: false,
        list: []
      }
    },
    methods: {
      changekeyword() {
        this.able = false;
        this.keyword = this.keyword_backup;
        this.list_show = true;
      },
      inputchange() {
        console.log(window.sessionStorage.getItem('Token'))
        if (this.keyword != "") {
          this.axios.get('http://124.222.44.159:8080/user/search', {
              params: {
                realName_id: this.keyword
              },
              headers: {
                Token: window.sessionStorage.getItem('Token')
              }

            }
          ).then(res => {
            if (res.data.code == 2000) {
              this.list = res.data.data
            }
          })
          if (this.afterselect === false) {
            this.keyword_backup = this.keyword;
            this.list_show = true;
          }
        }


      },
      objectselected(index, item) {
        this.currentindex = index;
        this.userid = item.user_id;
        this.keyword = item.realName + '   ' + item.stid + '   ' + item.sex;
        this.list_show = false;
        this.able = true;
      },
      resetkey() {
        this.dialogVisible = true;
        this.axios.get('http://124.222.44.159:8080/reset/secret/' + this.userid, {
          headers: {
            'Token': window.sessionStorage.getItem('Token')
          }
        }).then(res => {
          if (res.data.code == 2000) {
            this.key = res.data.data
          }
        })
      }


    }
  }
</script>

<style>
  .input {
    font-size: 16px;
    width: 500px !important;
    height: 40px !important;
  }

  .ps {
    position: relative;
    color: red;
    left: 550px;
    top: -50px;
  }

  .key {
    color: red;
    font-size: 18px;
  }

  .dialog_text {
    font-size: 18px;
  }

  .resetbutton {
    position: relative;
    left: 50px;
    top: -10px;
    height: 50px;
    width: 400px;
    background: #4E6996 !important;
    color: white;
    font-size: 18px;
  }

  .active {
    text-align: left;
    margin-left: -60px;
    background: rgb(155, 179, 202);
  }

  ol {
    text-align: left;
    margin-left: -60px;

  }

  .list_frame {
    position: relative;
    overflow: scroll;
    top: 0px;
    padding: 0px;
    height: 200px;
    width: 500px;
    border: 1px solid black;
    text-align: left;
  }

  .input {
    height: 30px;
    width: 400px;
  }

  .changebutton {
    position: relative;
    left: -40px;
  }
</style>
