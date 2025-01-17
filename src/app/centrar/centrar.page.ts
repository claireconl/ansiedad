import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-centrar',
  templateUrl: './centrar.page.html',
  styleUrls: ['./centrar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonCard, IonButtons, IonIcon, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CentrarPage implements OnInit {

  constructor() { }
  
  //funcion swiper para hacer las tarjetas con diapositivas
  swiperSlideChanged(e: any){
  }
  ngOnInit() {
  }

}
