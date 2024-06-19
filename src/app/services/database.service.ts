import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_ANSIEDAD = 'miansiedaddb';

export interface Contacto{
  id_numero: string;
  nombre: string;
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

    const schema = `CREATE TABLE IF NOT EXISTS contactos{
    id_numero TEXT PRIMARY KEY,
    nombre TEXT NOT NULL
    }`;

    await this.db.execute(schema);
    this.loadContactos();
    return true;
  }

  //CRUD
  async anadirContacto(numero:string, nombre:string){
    const query = `INSERT INTO contactos VALUES ('${numero}','${nombre})`;
    const resultado = await this.db.query(query);

    this.loadContactos();
    return resultado;
  }

  async eliminarContacto(nombre:string){
    const query = `DELETE FROM contactos WHERE nombre=${nombre}`;
    const resultado = await this.db.query(query);

    this.loadContactos();
    return resultado;
  }
  
  async loadContactos(){
    const contactos = await this.db.query('SELECT * FROM contactos;');
    this.contactos.set(contactos.values || []);
  }

  getContactos(){
    return this.contactos;
  }
}
