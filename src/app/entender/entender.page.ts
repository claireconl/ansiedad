import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entender',
  templateUrl: './entender.page.html',
  styleUrls: ['./entender.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonAccordion, IonAccordionGroup, IonItem, IonLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EntenderPage implements OnInit {
  
  swiperSlideChanged(e: any){
  }

  constructor() { }

  ngOnInit() {
  }

}
