import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClientesService } from '../services/clientes.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes$: Observable<Cliente[]> | null = null;

  ngOnInit(): void {
  }

  constructor(private clientesService: ClientesService, 
    private dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
      disableClose: true
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['edit', cliente._id], {relativeTo: this.route});
  }

  onRemove(cliente: Cliente) {
    this.clientesService.remove(cliente._id).subscribe(
      () => {
        this.onSucess('Cliente removido com sucesso!', 'X' , 2000);
        this.refresh();
      },
      error => this.onError('Erro ao tentar remover cliente!')
    );
  }

  refresh() {
    this.clientes$ = this.clientesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar clientes.')
        return of([])
      })
    );
  }

  private onSucess(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, { duration: duration, verticalPosition: 'top', horizontalPosition: 'center' })
  }

}
