import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare let window: any;

@IonicPage({
  name: 'image-target',
  segment: 'image-target'
})
@Component({
  selector: 'page-image-target',
  templateUrl: 'image-target.html',
})
export class ImageTargetPage {

  recognitionType: number;
  findName: string;
  isFind: boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private ref: ChangeDetectorRef) {
  }
  ionViewDidEnter() {
    document.addEventListener('CordovaVuforia.onTargetFound', (data: any) => {
      if (data.status == 1) {
        console.log('TargetFound:', data.imageName);
        this.isFind = true;
        this.findName = data.imageName;
        this.ref.detectChanges();
      } else {
        this.isFind = false;
        this.findName = null;
        this.ref.detectChanges();
      }
    });
    this.setImageTargetModel();
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
   * 开启本地识别
   */
  setImageTargetModel() {
    this.recognitionType = 0;
    this.setRecognitionType(this.recognitionType).then(() => {
      let params = [{
        imageName: 'Chips',
        matrix: {
          posX: 1,
          posY: 1,
          posZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 0,
          rotate: -90
        },
        map: 'models/cordova_vuforia_test.png',
        filepath: "StonesAndChips.xml"
      }, {
        imageName: 'Stones',
        matrix: {
          posX: 1,
          posY: 1,
          posZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 0,
          rotate: -90
        },
        map: 'models/cordova_vuforia_test.png',
        filepath: "StonesAndChips.xml"
      }];
      window.CordovaVuforia.setImageTargetModel(params, () => {
        console.log('success');
      }, () => {
        console.error('error');
      })
    }).catch((e) => {
      console.error('catch error:',e);
    });
  }
}
