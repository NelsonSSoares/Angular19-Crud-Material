import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';

  constructor() { }

  salvar(cliente: Cliente): void {
    // Aqui você pode adicionar a lógica para salvar o cliente, como enviar para um serviço ou API
    console.log('Cliente salvo:', cliente);
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
