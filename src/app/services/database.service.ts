import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_ANSIEDAD = 'myansiedaddb';

export interface Contacto {
  id: number;
  nombre: string;
  numero: string;
}

export interface Diario{
  id: string;
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

  async initializPlugin(){
    this.db = await this.sqlite.createConnection(
      DB_ANSIEDAD,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS contactos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    numero TEXT NOT NULL);
    
    CREATE TABLE IF NOT EXISTS diario(
    id TEXT PRIMARY KEY,
    texto TEXT,
    emocion TEXT);`;

    await this.db.execute(schema);
    this.cargarContactos();
    this.cargarDiario();
    return true;
  }

  //CRUD
  async anyadirContacto(nombre: string, numero:string){
    const query = `INSERT INTO contactos (nombre, numero) VALUES ('${nombre}','${numero}')`;
    const result = await this.db.query(query);

    this.cargarContactos();
    return result;
  }

  async borrarContacto(id:string){
    const query = `DELETE FROM contactos WHERE id=${id}`;
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

  async crearDiario(fecha: string, texto: string, emocion: string){
    const query = `INSERT INTO diario VALUES ('${fecha}','${texto}','${emocion}')`;
    const result = await this.db.query(query);

    this.cargarDiario();
    return result;
  }

  async guardarEmocion(id: string, emocion: string){
    const query = `UPDATE diario SET emocion=${emocion} WHERE id=${id}`;
    const result = await this.db.query(query);

    this.cargarDiario();
    return result;
  }

  async guardarTexto(text: string){
    const query = `UPDATE diario SET texto=${text}`;
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
