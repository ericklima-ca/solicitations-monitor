import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'monitor-dialog-response',
  templateUrl: './monitor-dialog-response.component.html',
  styleUrls: ['./monitor-dialog-response.component.css'],
})
export class MonitorDialogResponseComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      response: string;
      sku: string;
      amount: number;
      product: string;
    }
  ) {}
}
