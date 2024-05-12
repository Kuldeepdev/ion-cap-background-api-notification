import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { BackgroundRunner } from '@capacitor/background-runner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, MessageComponent],
})
export class HomePage {
  private data = inject(DataService);
  constructor() {
    this.init();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  // Request permissions for background tasks
  async init() {
    try {
      const permissions = await BackgroundRunner.requestPermissions({
        apis: ['notifications','geolocation'],
      });
      this.getMessageBySeniorCitizen();
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  async getMessageBySeniorCitizen(){
    const result = await BackgroundRunner.dispatchEvent({
      label: 'ion.cap.background.api.notification.apinotification',
      event: 'getMessageBySeniorCitizen',
      details: {},
    });
    this.data.addMessage(result);
    this.getMessageBySeniorCitizen();
  }

}
