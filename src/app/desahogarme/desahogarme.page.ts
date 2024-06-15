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
  public contador: number;

  constructor() {
    this.today = Date.now();
    this.contador = 0;
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

  hola(nombre: string){
    let acordeon = document.getElementById(nombre);
    acordeon!.remove();
    if(document.getElementById("lista-contactos")!.children.length==0){
      document.getElementById("div-contactos")!.remove();
      this.contador=0;
    }
    else{
      this.contador--;
    }
  }
  anadirContacto(){
    let seccion = document.getElementById('contact');
    let nombre = (document.getElementById('nombre')as HTMLInputElement)!.value;
    let nuevoContacto = '';
    if(nombre !== ''){
      if(document.getElementById('lista-contactos') == null){
        nuevoContacto =`<div id="div-contactos"style="background-color: #FEFEEF;border-radius: 1em;border-color: #0A0048;margin: 0.5em 1.2em;border-style: solid;border-width: .16em;">
                        <ion-accordion-group id="lista-contactos" style="display: flex;flex-direction: column; align-items: center;">
                          <ion-accordion id="`+nombre+`" style="width: 90%; border-radius: 1em;">
                            <ion-item slot="header" style="--background: #FEFEEF;">
                              <ion-label>`+nombre+`</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content" style="background-color: #FEFEEF; padding: .5em 0; display:flex;flex-direction:column;">
                            <ion-item style="--background: #FEFEEF;">
                              <ion-icon name="call-outline"></ion-icon>
                              <ion-label style="margin-left: .5em">Llamar</ion-label>
                            </ion-item>
                            <ion-item style="--background: #FEFEEF; --inner-border-width:0">
                              <ion-icon name="logo-whatsapp"></ion-icon>
                              <ion-label style="margin-left: .5em">Abrir WhatsApp</ion-label>
                            </ion-item>
                            <ion-button class="btn-el" style="--background:#FF8585; --color:#0A0048;font-weight: 600;width: 40%;align-self: center;">Eliminar</ion-button>
                            </div>
                          </ion-accordion>
                        </ion-accordion-group>
                        </div>`;
        seccion!.insertAdjacentHTML("afterbegin", nuevoContacto);
        document.getElementsByClassName("btn-el")[0]!.addEventListener("click", () => { this.hola(nombre) });
        }
        else{
          seccion = document.getElementById('lista-contactos');
          document.getElementById("div-contactos")!.style.display='block';
          nuevoContacto = `<ion-accordion id="`+nombre+`" style="width: 90%; border-radius: 1em;">
                            <ion-item slot="header" style="--background: #FEFEEF;">
                              <ion-label>`+nombre+`</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content" style="background-color: #FEFEEF; padding: .5em 0; display:flex;flex-direction:column;">
                            <ion-item style="--background: #FEFEEF;">
                              <ion-icon name="call-outline"></ion-icon>
                              <ion-label style="margin-left: .5em">Llamar</ion-label>
                            </ion-item>
                            <ion-item style="--background: #FEFEEF; --inner-border-width:0">
                              <ion-icon name="logo-whatsapp"></ion-icon>
                              <ion-label style="margin-left: .5em">Abrir WhatsApp</ion-label>
                            </ion-item>
                            <ion-button class="btn-el" style="--background:#FF8585; --color: #0A0048;font-weight: 600;width: 40%;align-self: center;" (click)="eliminarContacto('`+nombre+`')">Eliminar</ion-button>
                            </div>
                          </ion-accordion>`;
        seccion!.insertAdjacentHTML("beforeend", nuevoContacto);
        this.contador++;
        document.getElementsByClassName("btn-el")[this.contador]!.addEventListener("click", () => { this.hola(nombre) });
      }
    }
    (document.getElementById('nombre')as HTMLInputElement)!.value = '';
  }

 

}
