import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserdefinePage } from './userdefine';

@NgModule({
  declarations: [
    UserdefinePage,
  ],
  imports: [
    IonicPageModule.forChild(UserdefinePage),
  ],
})
export class UserdefinePageModule {}
