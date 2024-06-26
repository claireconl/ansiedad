import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexPage implements OnInit {

  //funcion para salir de la App cuando se da al boton de atras desde la pantalla de inicio
  constructor(
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet!.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {
  }
}