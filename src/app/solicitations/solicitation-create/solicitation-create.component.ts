import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Solicitation } from '../solicitation.model';
import { SolicitationService } from '../solicitation.service';

@Component({
  selector: 'app-solicitation-create',
  templateUrl: './solicitation-create.component.html',
  styleUrls: ['./solicitation-create.component.css'],
})
export class SolicitationCreateComponent {
  constructor(private solicitationService: SolicitationService) {}

  onCreateSolicitation(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let { order, sku, product, amount, center } = form.value;

    this.solicitationService.createSolicitation(
      order,
      sku,
      product,
      amount,
      center
    );
    form.resetForm();
  }
}
