<template>
  <div class="p-my">
    <!--个人信息-->
    <div class="info-wrap">
      <span class="nick-name">{{ userInfo && userInfo.nickName }}</span>
      <span class="avatar">
        <image :src="userInfo.avatarUrl" />
      </span>
    </div>

    <!--菜单栏-->
    <div class="menu-wrap">
      <div>
        <van-cell
          title="单元格1"
          icon="location-o"
          is-link/>
        <van-cell
          title="单元格2"
          icon="location-o"
          is-link/>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import CONSTANT from '@/base/constant/constant';

export default {
  mounted() {
    const __this = this;
    __this.initUserInfo();
  },

  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    /**
     * @desc 将 CONSTANT.USER_INFO 赋值到 this.userInfo
     */
    initUserInfo() {
      
      this.userInfo = CONSTANT.USER_INFO;
      this.$set(this, 'userInfo', CONSTANT.USER_INFO)
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.p-my {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  .info-wrap {
    padding: 50rpx 20rpx;
    background-color: #fff;
    border-bottom: 1px solid #ebedf0;
  }
  .menu-wrap {
    margin-top: 40rpx;
  }
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
    display: inline-block;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
