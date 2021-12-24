import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solicitation } from 'src/app/models';
import { SolicitationService } from 'src/app/services/solicitation.service';

@Component({
  selector: 'solicitation-create-dialog',
  styleUrls: ['./solicitation-create-dialog.component.css'],
  templateUrl: './solicitation-create-dialog.component.html',
})
export class SolicitationCreateDialog {
  constructor(
    public dialogRef: MatDialogRef<SolicitationCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitationService: SolicitationService
  ) {
    this.solicitationService.getProduct(data.ProductId);
    this.solicitationService.productSubject.subscribe((content) => {
      if (!content.ok) {
        this.data.message = 'Produto não encontrado';
      } else {
        this.data.product = content.product;
      }
    });
  }

  onCreateSolicitation() {
    const { order, amount, CenterId, ProductId } = this.data;
    const solicitation = {
      order: order,
      amount: amount,
      CenterId: CenterId,
      ProductId: ProductId,
    };
    this.solicitationService.createSolicitation(solicitation);
    this.data.message = 'Solicitação enviada';
  }
  _closeDialog() {
    this.dialogRef.close('ok');
  }
}
