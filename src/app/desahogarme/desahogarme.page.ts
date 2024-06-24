import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonItem, IonDatetime, IonAccordionGroup, IonAccordion, IonTextarea, IonButton, IonInput} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Contacto, DatabaseService } from '../services/database.service';

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
      numero: ['', [Validators.required]],
    });
    this.crearRegistroDiario();
  }

  async crearRegistroDiario(){
    this.formatedString = this.dateValue.split('T')[0];
    await this.database.crearDiario(this.formatedString, null, null);
  }

  async crearContacto(){
    await this.database.anyadirContacto(this.formContacto.value.nombre, this.formContacto.value.numero);
    (document.getElementById('nombre')as HTMLInputElement)!.value = '';
    (document.getElementById('numero')as HTMLInputElement)!.value = '';
  }

  borrarUsuario(contacto: Contacto){
    this.database.borrarContacto(contacto.id.toString());
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

 async guardarEmoji(){
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
    this.formatedString = this.dateValue.split('T')[0]; 
    await this.database.guardarEmocion(this.formatedString, this.emoticonoElegido);
 }

 //DIARIO
 async abrirDiario(value: any){
  this.dateValue = value;
  this.formatedString = value.split('T')[0]; 
  let seccion = document.getElementById("nuevaSeccion");
  let seccionNueva ='';
  let texto = (document.getElementById("areaTexto") as HTMLTextAreaElement)!.value;
  let imagen = document.getElementById(this.emoticonoElegido) as HTMLImageElement;
  await this.database.crearDiario(this.formatedString, texto, this.emoticonoElegido);
  //CASOS
    //no existe ningun registro
    if(this.emoticonoElegido=='' && texto==''){
      seccionNueva = `<p style="padding-left: 1em;">No hay registro para este día</p>`;
    }
    //existe emocion pero no texto
    else if(this.emoticonoElegido!='' && texto==''){
      seccionNueva = `<img width="60" height="60" src="`+imagen.src+`">`;
    }
    //existe texto pero no emocion
    else if(this.emoticonoElegido=='' && texto!=''){
      seccionNueva = `<p style="padding-left: 1em;">`+texto+`</p>`;
    }
    //existen ambos registros
    else{
      seccionNueva = `<img width="60" height="60" src="`+imagen.src+`">
                      <p style="padding-left: 1em;">`+texto+`</p>`;
    }
    seccion!.innerHTML=seccionNueva
 }
}
