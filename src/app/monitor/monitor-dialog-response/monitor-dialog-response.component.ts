import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'monitor-dialog-response',
  templateUrl: './monitor-dialog-response.component.html',
  styleUrls: ['./monitor-dialog-response.component.css'],
})
export class MonitorDialogResponseComponent {
  messageFlash?: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      SolicitationId: number;
      response: string;
      sku: string;
      amount: number;
      product: string;
    },
    public router: Router,
    public responseService: ResponseService
  ) {}

  onConfirm() {
    this.responseService.respondSolicitation(
      this.data.SolicitationId,
      this.data.response.toLowerCase()
    );

    this.router.navigate(['']);
  }
}
