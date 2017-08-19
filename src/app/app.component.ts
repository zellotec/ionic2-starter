import { MbaNotification } from './../providers/mba-notification';
import { Home, KeyStorageOnboard, Login, Onboard } from '../pages';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Authentication } from '@mbamobi/authentication';
import { Nav, Platform } from 'ionic-angular';
import { Config } from '@mbamobi/configuration';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  template: `<ion-nav></ion-nav>`
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  constructor(
    private auth: Authentication,
    private platform: Platform,
    private splashscreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private config: Config,
    private notification: MbaNotification,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      let settings = {
        kOSSettingsKeyAutoPrompt: true,
        kOSSettingsKeyInAppLaunchURL: false
      };
      this.oneSignal.startInit(
        this.config.get('onesingalAppId'),
        this.config.get('googleProjectNumber')
      );
      this.oneSignal.iOSSettings(settings);
      this.oneSignal.endInit();
      this.oneSignal.getIds().then(
        (ids) => {
          this.notification.registerClient(ids.userId).subscribe(
            () => {
              console.log('cliente registrado com sucesso');
            },
            (error) => {
               console.log('erro ao registrar cliente');
               console.log(error);
            }
          );
        }
      );
      this.openHome();
    });
  }

  openHome() {
    this.choiceHome().subscribe((page: any) => {
      this.nav.setRoot(page).then(() => {
        setTimeout(() => {
          this.splashscreen.hide();
        }, 500);
      });
    });
  }

  choiceHome() {
    return new Observable<any>((observer: Observer<any>) => {
      if (Onboard) {
        this.storage.get(KeyStorageOnboard).then((data) => {
          if (!data) {
            observer.next(Onboard);
            observer.complete();
          }

          observer.next(this.choiceLoginOrHome());
          observer.complete();
        });
      } else {
        observer.next(this.choiceLoginOrHome());
        observer.complete();
      }
    });
  }

  choiceLoginOrHome(): any {
    if (Login) {
      if (!this.auth.has()) {
        return Login;
      }
    }

    return Home;
  }
}
