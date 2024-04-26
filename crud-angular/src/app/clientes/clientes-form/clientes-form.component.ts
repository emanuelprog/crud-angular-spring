import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss']
})
export class ClientesFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientesService: ClientesService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const cliente: Cliente = this.route.snapshot.data['cliente'];
    this.form = this.formBuilder.group({
      _id: [cliente._id],
      name: [cliente.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      age: [cliente.age, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.clientesService.save(this.form.value).subscribe({
        next: data => this.onSucess('Cliente salvo com sucesso!', 5000),
        error: () => {
          this.onError('Erro ao salvar cliente.', 5000);
        }
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSucess(message: string, duration: number) {
    this.snackBar.open(message, '', { duration: duration })
    this.onCancel();
  }

  private onError(message: string, duration: number) {
    this.snackBar.open(message, '', { duration: duration })
  }

}
