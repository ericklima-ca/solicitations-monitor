import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Center, Product, Solicitation } from '../../models';
import { SolicitationService } from '../../services/solicitation.service';
import { SolicitationCreateDialog } from './solicitation-create-dialog/solicitation-create-dialog.component';

@Component({
  selector: 'app-solicitation-create',
  templateUrl: './solicitation-create.component.html',
  styleUrls: ['./solicitation-create.component.css'],
})
export class SolicitationCreateComponent {
  dataToNew = new Subscription();
  products!: Product[];
  centers!: Center[];
  constructor(
    private solicitationService: SolicitationService,
    public dialog: MatDialog
  ) {}

  openDialog(form: NgForm) {
    const dialogRef = this.dialog.open(SolicitationCreateDialog, {
      data: {
        ...form.value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        form.resetForm();
      }
    });
  }
}
