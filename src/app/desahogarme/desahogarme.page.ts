import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonItem, IonDatetime, IonAccordionGroup, IonAccordion, IonTextarea, IonButton, IonInput} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-desahogarme',
  templateUrl: './desahogarme.page.html',
  styleUrls: ['./desahogarme.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonItem, IonDatetime, IonAccordionGroup, IonAccordion, IonTextarea, IonButton, IonInput, CommonModule, FormsModule,ReactiveFormsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesahogarmePage implements OnInit {
  public today: number;
  public dateTime!: string;
  public contador: number;
  public dateFormat!: string;
  emoticonoElegido='';
  dateValue = new Date().toISOString();
  formatedString = '';
  contactos = this.database.getContactos();
  formContacto: FormGroup = {} as FormGroup;


  constructor(private database: DatabaseService, private fb: FormBuilder) {

    this.today = Date.now();    
    this.contador = 0;
   }
  ngOnInit() {
    setTimeout(() => {
      this.setToday();
    });
    this.formContacto = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  async crearContacto(){
    await this.database.anyadirContacto(this.formContacto.value.nombre);
  }

  borrarUsuario(nombre: string){
    this.database.borrarContacto(nombre);
  }

  setToday(){
    this.formatedString = this.dateValue.split('T')[0]; 
  }


  abrirEscribir(){
    let seccion = document.getElementById("escribir");
    seccion!.style.display = 'block';
  }

  abrirAnimo(){
    let seccion = document.getElementById("animo");
    seccion!.style.display = 'flex';
   }

  abrirContactos(){
   let seccion = document.getElementById("contact");
   seccion!.style.display = 'block';
  }

  abrirCalendario(){
    let seccion = document.getElementById("calendario");
    seccion!.style.display = 'block';
  }

  cerrarResto(nombre: string){
    if(nombre==='contact'){
      document.getElementById("escribir")!.style.display='none';
      document.getElementById("animo")!.style.display='none';
      document.getElementById("calendario")!.style.display='none';
    }
    else if(nombre==='escribir'){
      document.getElementById("contact")!.style.display='none';
      document.getElementById("animo")!.style.display='none';
      document.getElementById("calendario")!.style.display='none';
    }
    else if(nombre==='animo'){
      document.getElementById("escribir")!.style.display='none';
      document.getElementById("contact")!.style.display='none';
      document.getElementById("calendario")!.style.display='none';
    }
    else{
      document.getElementById("escribir")!.style.display='none';
      document.getElementById("contact")!.style.display='none';
      document.getElementById("animo")!.style.display='none';
    }
  }

  eliminarContacto(nombre: string){
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
        document.getElementsByClassName("btn-el")[0]!.addEventListener("click", () => { this.eliminarContacto(nombre) });
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
        document.getElementsByClassName("btn-el")[this.contador]!.addEventListener("click", () => { this.eliminarContacto(nombre) });
      }
    }
    (document.getElementById('nombre')as HTMLInputElement)!.value = '';
  }

 //ANIMO

 seleccionImagen(id:string){
  if(id=="muytriste"){
    document.getElementById("muytriste")!.style.filter="grayscale(0%)";
    document.getElementById("triste")!.style.filter="grayscale(100%)";
    document.getElementById("normal")!.style.filter="grayscale(100%)";
    document.getElementById("feliz")!.style.filter="grayscale(100%)";
    document.getElementById("muyfeliz")!.style.filter="grayscale(100%)";
  }

  if(id=="triste"){
    document.getElementById("muytriste")!.style.filter="grayscale(100%)";
    document.getElementById("triste")!.style.filter="grayscale(0%)";
    document.getElementById("normal")!.style.filter="grayscale(100%)";
    document.getElementById("feliz")!.style.filter="grayscale(100%)";
    document.getElementById("muyfeliz")!.style.filter="grayscale(100%)";
  }

  if(id=="normal"){
    document.getElementById("muytriste")!.style.filter="grayscale(100%)";
    document.getElementById("triste")!.style.filter="grayscale(100%)";
    document.getElementById("normal")!.style.filter="grayscale(0%)";
    document.getElementById("feliz")!.style.filter="grayscale(100%)";
    document.getElementById("muyfeliz")!.style.filter="grayscale(100%)";
  }

  if(id=="feliz"){
    document.getElementById("muytriste")!.style.filter="grayscale(100%)";
    document.getElementById("triste")!.style.filter="grayscale(100%)";
    document.getElementById("normal")!.style.filter="grayscale(100%)";
    document.getElementById("feliz")!.style.filter="grayscale(0%)";
    document.getElementById("muyfeliz")!.style.filter="grayscale(100%)";
  }

  if(id=="muyfeliz"){
    document.getElementById("muytriste")!.style.filter="grayscale(100%)";
    document.getElementById("triste")!.style.filter="grayscale(100%)";
    document.getElementById("normal")!.style.filter="grayscale(100%)";
    document.getElementById("feliz")!.style.filter="grayscale(100%)";
    document.getElementById("muyfeliz")!.style.filter="grayscale(0%)";
  }
 }

 guardarEmoji(){
    if(document.getElementById("muytriste")!.style.filter=="grayscale(0%)"){
      this.emoticonoElegido="muytriste";
    }
    else if(document.getElementById("triste")!.style.filter=="grayscale(0%)"){
      this.emoticonoElegido="triste";
    }
    else if(document.getElementById("normal")!.style.filter=="grayscale(0%)"){
      this.emoticonoElegido="normal";
    }
    else if(document.getElementById("feliz")!.style.filter=="grayscale(0%)"){
      this.emoticonoElegido="feliz";
    }
    else if(document.getElementById("muyfeliz")!.style.filter=="grayscale(0%)"){
      this.emoticonoElegido="muyfeliz";
    }
    else{
      this.emoticonoElegido='';
    }
 }

 //DIARIO
 abrirDiario(value: any){
  this.dateValue = value;
  this.formatedString = value.split('T')[0]; 
  let seccion = document.getElementById("nuevaSeccion");
  let seccionNueva ='';
  let texto = (document.getElementById("areaTexto") as HTMLTextAreaElement);
  let imagen = document.getElementById(this.emoticonoElegido) as HTMLImageElement;
  //CASOS
    //no existe ningun registro
    if(this.emoticonoElegido=='' && texto.value==''){
      seccionNueva = `<p style="padding-left: 1em;">No hay registro para este día</p>`;
    }
    //existe emocion pero no texto
    else if(this.emoticonoElegido!='' && texto.value==''){
      seccionNueva = `<img width="60" height="60" src="`+imagen.src+`">`;
    }
    //existe texto pero no emocion
    else if(this.emoticonoElegido=='' && texto.value!=''){
      seccionNueva = `<p style="padding-left: 1em;">`+texto.value+`</p>`;
    }
    //existen ambos registros
    else{
      seccionNueva = `<img width="60" height="60" src="`+imagen.src+`">
                      <p style="padding-left: 1em;">`+texto.value+`</p>`;
    }
    seccion!.innerHTML=seccionNueva
 }
}
