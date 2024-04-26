import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Cliente } from '../model/cliente';
import { ClientesService } from '../services/clientes.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver  {

  constructor(private service: ClientesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', age: null });
  }
}