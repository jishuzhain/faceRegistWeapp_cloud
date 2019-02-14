//云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');
const SERVER_IP = 'http://59.41.223.227:8083';
const URL = '/face-manage/api/weixin/saveVisitor';


cloud.init();

axios.defaults.headers.post['Content-Type'] = 'application/json';

//云函数入口
exports.main = async (event, context) => {
  return new Promise(function(resolve, reject) {
    console.log('打印event');
    console.log(event);
    axios.post(SERVER_IP + URL, event.params, {})
      .then(resp => {
        console.log("接下来打印resp")
        console.log(resp)
        resolve(resp.data)
      })
      .catch(err => {
        console.log("接下来打印err")
        reject(err)
      })
  })
  
}