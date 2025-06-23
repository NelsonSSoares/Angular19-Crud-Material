import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../models/cliente/cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { query } from 'express';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  constructor(
    private service: ClienteService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((query: any) => {
        const params = query['params']
        const id = params['id'];
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {

          this.atualizando= true;
          this.cliente = clienteEncontrado;
        }
      }
    );
  };

  salvar() {
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
  }



}
