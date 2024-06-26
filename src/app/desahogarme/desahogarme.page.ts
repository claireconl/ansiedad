import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
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
  //Variables usadas
  public today: number;
  public dateTime!: string;
  public dateFormat!: string;
  emoticonoElegido='';
  textoEscrito='';
  dateValue = new Date().toISOString();
  fechaHoy = '';
  fechaEscogida='';
  contactos = this.database.getContactos();
  diarios = this.database.getDiario();
  formContacto: FormGroup = {} as FormGroup;
  isSubmited= false;
  public mensajes_validacion ={
    'nombre':[
      {type: 'required', message: 'El nombre no puede quedar vacío' }
    ],
    'numero':[
      {type: 'required', message: 'El número no puede quedar vacío'},
      {type: 'minlength', message: 'El número debe tener 9 dígitos'},
      {type: 'maxlength', message: 'El número debe tener 9 dígitos'},
      {type: 'pattern', message: 'Introduce solo números en el campo número'}
    ],
  }

  //costructor que conecta con la BD y establece el formulario para rellenar un contacto
  constructor(private database: DatabaseService, private fb: FormBuilder) {
    this.today = Date.now();    
   }

  //al iniciar la App se define la fecha de hoy, el formulario para rellenar un contacto, se crea un registro en
  //la tabla diario con la fecha de hoy, si hubiera un texto o emocion predefinida, se muestran
  ngOnInit() {
    this.formContacto = this.fb.group({
      nombre: new FormControl('', Validators.required),
      numero: new FormControl('', {validators:[
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required
      ]}),
    });
    this.fechaHoy = this.dateValue.split('T')[0];
    this.crearRegistroDiario();
    this.mostrarTexto();
    this.mostrarEmoji();
  }

  //Funciones Diario
  async crearRegistroDiario(){
    await this.database.crearDiario(this.fechaHoy, this.textoEscrito, this.emoticonoElegido);
  }

  guardarTexto(){
    this.textoEscrito = (document.getElementById("areaTexto") as HTMLTextAreaElement)!.value;
    this.database.guardarTexto(this.fechaHoy,this.textoEscrito.toString());
  }

  mostrarTexto(){
    for(let item of this.diarios()){
      if(item.id==this.fechaHoy){
        (document.getElementById("areaTexto") as HTMLTextAreaElement)!.value=item.texto;
      }
    }
  }

  mostrarEmoji(){
    for(let item of this.diarios()){
      if(item.id==this.fechaHoy){
        if(item.emocion!=''){
          this.seleccionImagen(item.emocion)
        }
      }
    }
  }

  //Funciones Contactos
  async crearContacto(){
    this.isSubmited=true;
    if(this.formContacto.valid){
      await this.database.anyadirContacto(this.formContacto.value.numero, this.formContacto.value.nombre);
      (document.getElementById('nombre')as HTMLInputElement)!.value = '';
      (document.getElementById('numero')as HTMLInputElement)!.value = '';
    }
  }

  borrarContacto(numero: string){
    this.database.borrarContacto(numero);
  }

  //Funciones abrir y cerrar secciones desahogarme
  abrirEscribir(){
    let seccion = document.getElementById("escribir");
    if(seccion!.style.display == 'block'){
      seccion!.style.display='none';
    }
    else{
      seccion!.style.display='block';
    }
  }

  abrirAnimo(){
    let seccion = document.getElementById("animo");
    if(seccion!.style.display == 'flex'){
      seccion!.style.display='none';
    }
    else{
      seccion!.style.display='flex';
    }
   }

  abrirContactos(){
   let seccion = document.getElementById("contact");
   if(seccion!.style.display == 'block'){
      seccion!.style.display='none';
    }
    else{
      seccion!.style.display='block';
    }
  }

  abrirCalendario(){
    let seccion = document.getElementById("calendario");
    if(seccion!.style.display == 'block'){
      seccion!.style.display='none';
    }
    else{
      seccion!.style.display='block';
    }
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

 //Funciones Registro de Animo

 //funcion que pone los emoticonos no escogidos en escala de grises
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

//se guarda el emoticono que tenga todo el colorido y se llama a la funcion update de la BD
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
    this.database.guardarEmocion(this.fechaHoy, this.emoticonoElegido);
 }

 //Funcion mostrar entrada de diario
 abrirDiario(value: any){
  this.fechaEscogida = value.split('T')[0];
  let seccion = document.getElementById("nuevaSeccion");
  //por defecto no hay registro ni de emocion ni de texto
  let seccionNueva =`<p style="padding-left: 1em; margin-top:0;">No hay registro para este día</p>`;
  for(let item of this.diarios()){
    if(item.id==this.fechaEscogida){
      //no existe ni emocion ni texto
      if(item.emocion=='' && item.texto==''){
        seccionNueva = `<p style="padding-left: 1em; margin-top:0;">No hay registro para este día</p>`;
      }
      //existe emocion pero no texto
      else if(item.emocion!='' && item.texto==''){
        seccionNueva = `<img style="margin-top:0;margin-left:1em;" width="60" height="60" src="assets/imagenes/`+item.emocion+`.png">`;
      }
      //existe texto pero no emocion
      else if(item.emocion=='' && item.texto!=''){
        seccionNueva = `<p style="padding-left: 1em;  margin-top:0;">`+item.texto+`</p>`;
      }
      //existen ambos registros
      else{
        seccionNueva = `<img style="margin-top:0;margin-left:1em;" width="60" height="60" src="assets/imagenes/`+item.emocion+`.png">
                        <p style="padding-left: 1em;">`+item.texto+`</p>`;
      }
    }
  }  
    seccion!.innerHTML=seccionNueva
 }
}
