import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';



  constructor() { }

  salvar(cliente: Cliente): void {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  obterStorage(): Cliente[] {
    const clientesJson = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (clientesJson) {
      return JSON.parse(clientesJson) as Cliente[];
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
