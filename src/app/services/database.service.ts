import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_ANSIEDAD = 'myansiedaddb';

export interface Contacto {
  id: number;
  nombre: string;
  numero: string;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private contactos: WritableSignal<Contacto[]> = signal<Contacto[]>([]);

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
    numero VARCHAR(9) NOT NULL);`;

    await this.db.execute(schema);
    this.cargarContactos();
    return true;
  }

  //CRUD
  async anyadirContacto(nombre: string, numero:string){
    const query = `INSERT INTO contactos (nombre, numero) VALUES ('${nombre}','${numero}')`;
    const result = await this.db.query(query);

    this.cargarContactos();
    return result;
  }

  async borrarContacto(nombre:string){
    const query = `DELETE FROM contactos WHERE nombre=${nombre}`;
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
}
