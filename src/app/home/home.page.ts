import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform
  ) {

    this.init();
  }

  async init() {

    await this.platform.ready();

    this.readSim();
  }

  async readSim() {

    return this.platform.is('android') ?
      this.requestAndroidSimPermissions() :
      this.getSimInfo();
  }

  requestAndroidSimPermissions() {

    window['plugins'].sim.hasReadPermission(
      success => {

        console.log('hasReadPermission', success);

        this.getSimInfo()
      },
      error => {

        console.log('hasReadPermission', error);

        window['plugins'].sim.requestReadPermission(
          isGranted => {

            console.log('sim.requestReadPermission(): ', isGranted);

            return this.getSimInfo();
          },
          error => {

            console.log('sim.requestReadPermission() error: ', error);

            return this.getSimInfo();
          }
        );
      }
    );
  }

  getSimInfo() {

    window['plugins'].sim.getSimInfo(
      info => {

        console.log('sim.getSimInfo(): ', info);

        return info;
      },
      error => {

        console.log('sim.getSimInfo() error: ', error);

        return false;
      }
    );
  }
}
