import Vue from 'vue'
import App from './App'
import Toast from '../static/vant/toast/toast'
import '@/base/css/common.scss';


Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  traceUser: true
});

//封装 wx.cloud.callFunction
const __wxCloudCallFunction = wx.cloud.callFunction;
wx.cloud.callFunction = function() {
  console.log('call cloud function ....!!..!!')
  console.log(arguments)
  if(arguments && arguments[0] && arguments[0].data && arguments[0].data.custom && 
    arguments[0].data.custom.loading) {
      Toast.loading({
        message: '加载中...',
        duration: 0
      });
    }
  return __wxCloudCallFunction.apply(this, arguments);
}

const app = new Vue(App)
app.$mount()
