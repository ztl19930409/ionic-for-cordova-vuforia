import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare let window: any;

@IonicPage({
  name: 'userdefine',
  segment: 'userdefine'
})
@Component({
  selector: 'page-userdefine',
  templateUrl: 'userdefine.html',
})
export class UserdefinePage {

  recognitionType: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  /**
   * 设置Vuforia类型
   */
  setRecognitionType(type) {
    return new Promise((resolve, reject) => {
      let params = {
        type: type
      };
      window.CordovaVuforia.setRecognitionType(params, () => {
        console.log('success');
        resolve();
      }, () => {
        console.log('error');
        reject();
      })
    })
  }
  /**
   * 关闭Vuforia
   */
  stopVuforia() {
    let self = this;
    window.CordovaVuforia.stopVuforia(() => {
      console.log('success');
      self.navCtrl.pop();
      document.body.classList.remove('video-play');
    }, () => {
      console.log('error');
    });
  }
  /**
   * 获取自定义识别目标
   */
  getUserDefinedTarget() {
    this.recognitionType = 1;
    this.setRecognitionType(this.recognitionType).then(() => {
      window.CordovaVuforia.getUserDefinedTarget(() => {
        console.log('success');
        this.setUserDefinedTargetModel();
      }, () => {
        console.error('error');
      })
    }).catch(e => {
      console.error('catch error:', e);
    })
  }
  /**
   * 开启自定义识别
   */
  setUserDefinedTargetModel() {
    let params = [{
      matrix: {
        posX: 1,
        posY: 1,
        posZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 0,
        rotate: 0
      },
      map: 'models/cordova_vuforia_test.png'
    }];
    window.CordovaVuforia.setUserDefinedTargetModel(params, () => {
      console.log('success');
    }, () => {
      console.log('error');
    })
  }
  removeUserDefinedTarget(){
    window.CordovaVuforia.removeUserDefinedTarget(() => {
      console.log('success');
    }, () => {
      console.log('error');
    })
  }
}
