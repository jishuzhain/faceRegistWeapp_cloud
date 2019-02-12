import Toast from '../../static/vant/toast/toast';
import { respHasNext } from '../utils/index';

//toast实例
let loadingToast = null;

/**封装 wx.request 成 promise */
const wxRequest = (url, data, custom) => {
  if(custom.loading) {
    loadingToast = Toast.loading({
      //mask: true,
      message: '加载中...'
    });
  }
  return new Promise(function(resolve, reject) {
    wx.request({
      url,
      data,
      ...custom,
      success(resp) {
        if(respHasNext(resp)) {
          loadingToast && loadingToast.clear();
          resolve(resp);
        }
        reject(resp);
      },
      fail(err) {
        reject(err)
      },
      complete() {
        loadingToast && loadingToast.clear();
      }
    })
  })
}

//**新增访客 */
export const http_saveVisitor = (data, custom) => {
  return wxRequest("http://rong.easy.echosite.cn/face-manage/api/weixin/saveVisitor", data, {...custom, method: 'POST'})
}