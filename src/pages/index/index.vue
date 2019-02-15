<template>
  <div class="p-index">

    <div class="face-wrap" @click="uploadImgBtnCb">
      <span class="upload-face" v-if="!uploadImgTempPath"></span>
      <span class="upload-face with-face" v-if="uploadImgTempPath">
        <image
          :src="uploadImgTempPath"
          mode="scaleToFill"></image>
      </span>
      <p class="tc fsize-mini fcolor-tips">点击进行人脸拍照/选取上传</p>
    </div>

    <div class="form-wrap">
      <van-cell-group>
        <van-field
          required
          v-model="mainItemForm.visitorName"
          label="访客姓名"
          placeholder="请输入访客姓名"
          @change="inputChange($event, 'visitorName')"
        ></van-field>
        <van-field
          required
          v-model="mainItemForm.idCard"
          label="访客身份证"
          placeholder="请输入访客身份证"
          @change="inputChange($event, 'idCard')"
        ></van-field>
        <van-field
          v-model="mainItemForm.staffName"
          label="被访人姓名"
          placeholder="请输入被访人姓名"
          @change="inputChange($event, 'staffName')"
        ></van-field>
        <!-- <input type="text" v-model="mainItemForm.idCard" placeholder="请输入test"/> -->
      </van-cell-group>
      <!-- <van-checkbox v-model="checked" @change="checkChange">复选框</van-checkbox> -->
    </div>

    <div class="btn-wrap">
      <van-button size="large" type="primary" @click.stop="saveMainItem">提 交</van-button>
    </div>

    <!--vant组件-->
    <!-- <van-loading type="circular" color="red"/> -->
    <van-toast id="van-toast" />
    <van-notify id="van-notify"/>
    <van-dialog id="van-dialog" />
    
  </div>
</template>

<script>
import card from '@/components/card';
import Toast from '../../../static/vant/toast/toast';
import Dialog from '../../../static/vant/dialog/dialog';
//import Notify from '../../../static/vant/notify/notify';
import Notify from '../../utils/notify';
import CONSTANT from '@/base/constant/constant';


import { http_saveVisitor } from '@/utils/http';
import { cloudRespHasNext, cloudRespShowError, respShowError } from '@/utils/index';

const fileManager = wx.getFileSystemManager();

export default {
  created() {
    //console.warn('created..')
    
  },
  updated() {
    //console.warn('updated..')
  },
  mounted() {
    //console.warn('mounted..')
  },
  onShow() {
    //console.warn('onShow..')
    this.getUserInfo();
  },
  data () {
    return {
      uploadImgTempPath: "",
      test: '',
      test2: '',
      checked: true,

      //表单信息对象
      mainItemForm: {
        visitorName: '',
        idCard: '',
        staffName: ''
      }
    }
  },

  components: {
    card
  },

  methods: {
    inputChange(e, itemName) {
      itemName && (this.mainItemForm[itemName] = e.mp.detail);
    },

    checkChange(e) {
      this.checked = !this.checked
      console.log("checkChange..")
    },

    /**
     * @desc 获取用户信息
     */
    getUserInfo() {
      const __this = this;
      wx.getUserInfo({
        success: __this.getUserInfoSucc,
        fail: __this.getUserInfoFail,     //无法获取，弹窗引导用户授权
        complete: function() {
          // complete
        }
      })
    },

    /**
     * @desc 获取用户信息成功的回调
     * @param {Object} data 用户信息
     */
    getUserInfoSucc(data) {
      console.log('打印userInfo', data)
      CONSTANT.USER_INFO = data.userInfo;
    },

    /**
     * @desc 获取用户信息失败的回调
     */
    getUserInfoFail(err) {
      console.error('getUserInfoFail')
      Dialog.alert({
        title: '提示',
        message: `请先授权小程序获取您的个人信息（昵称、姓名）`
      }).then(() => {
        wx.navigateTo({
          url: '../authorization/main'
        })
      });
    },

    /**
     * @desc 上传图片
     */
    uploadImgBtnCb(e) {
      const self = this;
      wx.showActionSheet({
        itemList: ['从手机相册选择', '拍照'],
        success: self.showAcsSuc
      })
    },

    /**
     * @desc actionSheet 选择后的回调
     */
    showAcsSuc(resp) {
      const self = this;
      let sourceType = resp.tapIndex === 0 ? 'album' : 'camera';
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [sourceType],
        success(resp) {
          self.uploadImgTempPath = resp.tempFilePaths && resp.tempFilePaths[0]
        }
      })
    },

    /**
     * @desc 校验表单
     */
    validateMainItemForm() {
      const self = this;
      let result = true;

      if(!self.uploadImgTempPath) {
        Toast.fail({
          message: "请先上传/拍照一张人脸图",
          duration: 2*1000
        });
        result = false;
      }

      return result;
    },

    /**
     * @desc 提交表单
     */
    saveMainItem() {

      //xc test 测试卓悦外网ip接口
      //this.testZhuoInternetInterface()

      console.warn('saveMainItem')
      const self = this;
      const params = {
        ...self.mainItemForm
      };

      if( !(self.validateMainItemForm()) ) {
        console.error('检验失败')
        return;
      }

      console.warn('fileManager.readFile')
      fileManager.readFile({
        filePath: self.uploadImgTempPath,
        encoding: 'base64',
        success(resp) {
          params.faceImage = resp.data;    //服务器需要base64图片
          console.warn('发起请求')
          wx.cloud.callFunction({
            name: 'saveVisitor',
            data: { params, custom: {loading: true} }
          })
          .then(cloudRespHasNext)
          .then(resp => {
            console.warn(resp)
            Toast.clear();
          })
          .catch(cloudRespShowError)
        }
      })
    },

    /**
     * @desc 商用智能外网服务器接口
     */
    testZhuoInternetInterface() {
      wx.request({
        url: 'http://59.41.223.227:8082/face-manage/api/login',
        methods: 'POST',
        data: {
          username: 'lxc',
          password: '123'
        },
        success(resp) {
          console.log(resp)
        },
        fail(resp) {
          console.log(resp)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.face-wrap {
  height: 500rpx;

  .upload-face {
    width: 300rpx;
    height: 300rpx;
    background: url("../../../static/img/image/face-scan.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: block;
    margin: 60rpx auto;
  }
  .with-face {
    background: none;
    image {
      width: 100%;
      height: 100%;
    }
  }
}


.btn-wrap {
  margin-top: 60rpx;
  padding: 25rpx;
  .btn-submit {
    width: 700rpx;
    margin: 40px 25rpx;
  }
}

</style>
