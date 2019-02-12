import vanNotify from '../../static/vant/notify/notify';
import CONSTANT from '../base/constant/constant';

class Notify {
  constructor() {
    this.options = {
      text: '',
      duration: 5000,
      selector: '#van-notify',
      backgroundColor: ''
    }
  }
  _xcNotify(msg, color) {
    console.log('color', color)
    return vanNotify({
      ...this.options, 
      text: msg,
      backgroundColor: color
    })
  }


  success(msg) {
    return this._xcNotify(msg, CONSTANT.COLOR.SUCCESS);
  }
  warning(msg) {
    return this._xcNotify(msg, CONSTANT.COLOR.WARNING);
  }
  error(msg) {
    return this._xcNotify(msg, CONSTANT.COLOR.DANGER);
  }
  info(msg) {
    return this._xcNotify(msg, CONSTANT.COLOR.INFO);
  }
}

export default new Notify();