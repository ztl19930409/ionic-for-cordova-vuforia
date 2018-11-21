import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare let window: any;

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {
  vuforiaLicense: String = 'AcnADmH/////AAABmVVaq/iq5U3RhZh1oJxaj7tX+vu71ceQMlbS1Hh/5MPnZ9SvPlkcRgmd/sxfjjwuuzPTYQo++bJ2hXFhgrU5hLSHeXN7C6IBtdiVMBjGl0su+EGMCekXtRp6gVrI8PtMSrnbodjWQIsEhBBLuaijYwSIgr5HGgY6gkYvZWZHa4+DWNlLyBqpnOQ2ooQdQ0f5PHb8QfJPNOMPDNRUYzBBEWKotkCOlilhyiUYU6GvxodTMie49Ts0iWgF2ilpMhGsFYbaIpF2uKs23Ohd7ja4wyKevBUWzYjlufLx42gq5gyqX+LxGCiOd9hlQZo5Ym18JX29K1YksSITDRb9220dYQ+6A/sFNR3qvj1NFOEpSYyB';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidEnter() {
    this.initVuforia();
  }
  /**
   * 初始化Vuforia
   */
  initVuforia() {
    if (window.CordovaVuforia) {
      let params = {
        vuforiaLicense: this.vuforiaLicense
      };
      window.CordovaVuforia.initVuforia(params, () => {
        console.log('success');
      }, () => {
        console.log('error');
      });
    } else {
      setTimeout(() => {
        this.initVuforia();
      }, 100);
    }
  }
  /**
   * 启动vuforia服务
   */
  startVuforia(type) {
    let params = {
      camera: 0,
      type: 0
    }
    let self = this;
    window.CordovaVuforia.startVuforia(params, () => {
      document.body.classList.add('vuforia-show');
      console.log('success');
      if(type == 0){
        self.navCtrl.push('image-target');
      }else{
        self.navCtrl.push('userdefine');
      }
    }, () => {
      console.log('error');
    })
  }

}
