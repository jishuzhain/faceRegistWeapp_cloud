import CONSTANT from '../base/constant/constant';
//import Notify from '../../static/vant/notify/notify';
import Notify from './notify';
import Toast from '../../static/vant/toast/toast';


function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * @desc 服务器返回的判断是否有data
 * @param {Object} resp 
 * @return {Boolean} 是否有data
 */
export const respHasNext = resp => {
  if(resp && resp.data && resp.data.statusCode === '0') {
    return true;
  }
  return false;
}

/**
 * @desc 服务器返回的错误处理
 * @param {Object} resp 
 */
export const respShowError = resp => {
  console.warn('进入respShowError')
  if(resp && resp.data && resp.data.statusCode !== '0') {
    console.error(resp.data.describe)
    Notify.error(resp.data.describe)
  } else {
    console.error('无法打印describe', resp)
  }
}

/**
 * @desc 服务器返回的判断是否有data
 * @param {Object} resp 
 * @return {Boolean} 是否有data
 */
export const cloudRespHasNext = resp => {
  if(resp && resp.result && resp.result.statusCode === '0') {
    return resp;
  }
  return Promise.reject(resp);
}

/**
 * @desc 服务器返回的错误处理
 * @param {Object} resp 
 */
export const cloudRespShowError = resp => {
  console.warn('进入 cloudRespShowError')
  console.log('打印resp')
  console.error(resp)
  Toast.clear();
  if(resp && resp.result && resp.result.statusCode !== '0') {
    console.error(resp.result.describe)
    Notify.error(resp.result.describe)
  } else {
    console.error('无法打印describe', resp)
  }
}


export default {
  formatNumber,
  formatTime
}
