import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-desahogarme',
  templateUrl: './desahogarme.page.html',
  styleUrls: ['./desahogarme.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesahogarmePage implements OnInit {
  public today: number;
  constructor() {
    this.today = Date.now();
   }
  ngOnInit() {
  }

  abrirEscribir(){
    let seccion = document.getElementById("escribir");
    seccion!.style.display = 'block';
  }

  abrirAnimo(){
    let seccion = document.getElementById("animo");
    seccion!.style.display = 'block';
   }

  abrirContactos(){
   let seccion = document.getElementById("contact");
   seccion!.style.display = 'block';
  }

  cerrarResto(nombre: string){
    if(nombre==='contact'){
      document.getElementById("escribir")!.style.display='none';
      document.getElementById("animo")!.style.display='none';
    }
    else if(nombre==='escribir'){
      document.getElementById("contact")!.style.display='none';
      document.getElementById("animo")!.style.display='none';
    }
    else if(nombre==='animo'){
      document.getElementById("escribir")!.style.display='none';
      document.getElementById("contact")!.style.display='none';
    }
    else{
      document.getElementById("escribir")!.style.display='none';
      document.getElementById("contact")!.style.display='none';
      document.getElementById("animo")!.style.display='none';
    }

  }
}
