<template lang="html">
    <div class="userLocatorReg">
    <div class="header">
      <div class="title">
        <i class="icon iconfont">&#xe612;</i>
        <span>用户与定位物登记</span>
      </div>
    </div>
    <div class="content">
        <el-col :span="12">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="身份证号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              </el-form-item>
              <el-form-item label="出生年月">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="性别">
                <el-switch on-text="女" off-text="男" v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="身份证照片">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="display:inline-block">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="定位物物理地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="定位物标识">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="定位物类型">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
        </el-col>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      imageUrl: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style lang="less" scoped>
.userLocatorReg {
    width: 100%;
    height: 95%;
    // padding-top: 22px;
    position: relative;
    .header {
        height: 64px;
        margin-left: 22px;
        margin-right: 22px;
        background-color: #e6e6eb;
        line-height: 64px;
        font-size: 24px;
        margin-top: 22px;
        .title {
            margin-left: 15px;
            display: inline-block;
            .icon {
                font-size: 28px;
                position: relative;
                top: 4px;
            }
            span {
                margin-left: 5px;
            }
        }
        .search-box {
            display: inline-block;
            float: right;
            .button {
                top: -3px;
                left: -8px;
            }
        }
    }
    .content {
        margin-left: 22px;
        margin-right: 22px;
        padding-top: 15px;
        background-color: #fff;
        height: 88%;
        .el-form {
            // width: 45%;
            padding-left: 30px;
            padding-right: 50px;
            // display: inline-block;
            .el-form-item {
                margin-bottom: 10px;
                .avatar-uploader .el-upload {
                    display: inline-block;
                    border: 1px solid #d9d9d9 !important;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
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
            }
        }
    }

}
</style>
