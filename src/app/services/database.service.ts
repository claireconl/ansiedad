import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_ANSIEDAD = 'myansiedaddb';

//definicion de las interfaces para exportarlas y usarlas luego en la pagina desahogarme
export interface Contacto {
  id_numero: string;
  nombre: string;
}

export interface Diario{
  id_fecha: string;
  texto: string;
  emocion: string;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private contactos: WritableSignal<Contacto[]> = signal<Contacto[]>([]);
  private diario: WritableSignal<Diario[]> = signal<Diario[]>([]);

  constructor() { }

  //funcion para iniciar la conexion a la BD
  async initializPlugin(){
    this.db = await this.sqlite.createConnection(
      DB_ANSIEDAD,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    //esquema que crea las tablas de la BD
    const schema = `CREATE TABLE IF NOT EXISTS contactos(
    id_numero TEXT PRIMARY KEY,
    nombre TEXT NOT NULL);
    
    CREATE TABLE IF NOT EXISTS diario(
    id_fecha TEXT PRIMARY KEY,
    texto TEXT,
    emocion TEXT);`;

    await this.db.execute(schema);
    this.cargarContactos();
    this.cargarDiario();
    return true;
  }

  //CRUD CONTACTOS
  async anyadirContacto(numero: string, nombre:string){
    const query = `INSERT INTO contactos VALUES ('${numero}','${nombre}')`;
    const result = await this.db.query(query);

    this.cargarContactos();
    return result;
  }

  async borrarContacto(id:string){
    const query = `DELETE FROM contactos WHERE id_numero='${id}'`;
    const result = await this.db.query(query);

    this.cargarContactos();
    return result;
  }
  async cargarContactos(){
    const contactos = await this.db.query('SELECT * from contactos');
    this.contactos.set(contactos.values || []);
  }

  getContactos(){
    return this.contactos;
  }

  //CRUD DIARIO
  async crearDiario(fecha: string, texto: string, emocion: string){
    const query = `INSERT INTO diario VALUES ('${fecha}','${texto}','${emocion}')`;
    const result = await this.db.query(query);

    this.cargarDiario();
    return result;
  }

  async guardarEmocion(fecha: string, emocion: string){
    const query = `UPDATE diario SET emocion='${emocion}' WHERE id_fecha='${fecha}'`;
    const result = await this.db.query(query);

    this.cargarDiario();
    return result;
  }

  async guardarTexto(fecha: string, text: string,){
    const query = `UPDATE diario SET texto='${text}' WHERE id_fecha='${fecha}'`;
    const result = await this.db.query(query);

    this.cargarDiario();
    return result;
  }

  async cargarDiario(){
    const diario = await this.db.query('SELECT * from diario');
    this.diario.set(diario.values || []);
  }

  getDiario(){
    return this.diario;
  }
}
