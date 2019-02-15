<template>
  <div class="p-authorization">
    <van-button 
      open-type="getUserInfo" 
      type="primary"
      @getuserinfo="authorizationSuc"
      class="auth-btn">允许获取个人信息
    </van-button>
    <!-- <button 
      open-type="openSetting" 
      bindopensetting="openSettingCB">打开设置页
    </button> -->
  </div>
</template>

<script>
export default {
  name: 'Authorization',
  create() {

  },
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: {
    authorizationSuc(e) {
      if(!e.mp.detail.rawData) {
        console.warn('用户拒绝了授权')
        return;
      }
      setTimeout(() => {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          }
        })
      }, 0)
    },
    openSettingCB(e) {
      console.warn('openSettingCB...')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../base/css/page100h.scss";

.p-authorization {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content:space-around;

  .auth-btn {
    position: relative;
    top: -100rpx;
  }
}
</style>
