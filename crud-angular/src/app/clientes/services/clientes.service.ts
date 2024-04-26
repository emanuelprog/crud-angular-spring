import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'api/clientes';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Cliente[]>(this.API).pipe(
      first(),
      delay(2000)
    );
  }

  loadById(id: Number) {
    return this.httpClient.get<Cliente>(`${this.API}/${id}`);
  }

  save(cliente: Cliente) {
    console.log(cliente);
    
    if (cliente._id) {
      return this.update(cliente);
    } else {
      return this.create(cliente);
    }
  }

  private create(cliente: Cliente) {
    return this.httpClient.post<Cliente>(this.API, cliente).pipe(first());
  }

  private update (cliente: Cliente) {
    return this.httpClient.put<Cliente>(`${this.API}/${cliente._id}`, cliente).pipe(first());
  }

  remove (id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
