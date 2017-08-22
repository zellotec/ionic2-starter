import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MuralIonicModule } from '@mbamobi/mural-ionic';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MuralIonicModule
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}