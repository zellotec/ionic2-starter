import { Home, Login, Onboard } from '../pages/pages';
import { Component, ViewChild } from '@angular/core';
import { Authentication } from '@mbamobi/authentication';
import { Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

@Component({
  template: `<ion-nav></ion-nav>`
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform, private auth: Authentication) {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.showHome();
    });
  }

  private showHome() {
    if (Onboard) {
      this.nav.setRoot(Onboard);
      return;
    }
    else if (Login) {
        if (!this.auth.has()) {
          this.nav.setRoot(Login);
          return;
        }
      }

    this.nav.setRoot(Home).then(() => {
      Splashscreen.hide();
    });
  }
}
