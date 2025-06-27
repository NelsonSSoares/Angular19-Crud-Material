import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente/cliente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule

  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'cpf', 'dataNascimento', 'acoes'];
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.listaClientes = this.service.pesquisarCliente('');
  }

  pesquisarCliente() {
    this.listaClientes = this.service.pesquisarCliente(this.nomeBusca);
  }

  editarCliente(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletado = true;
  }

  deletarCliente(cliente: Cliente) {
    this.service.deletar(cliente);
    this.snack.open('Cliente deletado com sucesso!', 'Fechar');
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

}
