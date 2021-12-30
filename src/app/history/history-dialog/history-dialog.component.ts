import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitationHistory } from 'src/app/models';
import { ResponseService } from 'src/app/services/response.service';
import { SolicitationService } from 'src/app/services/solicitation.service';

@Component({
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css'],
})
export class HistoryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { solicitation: SolicitationHistory },
    private solicitationService: SolicitationService,
    private responseService: ResponseService
  ) {}

  sendNf(solicitation: SolicitationHistory, form: NgForm) {
    this.solicitationService.sendEmailforResponse(solicitation.ref, {
      obs: form.value.obs,
    });
    form.resetForm();
    this.responseService.getResponses();
  }
}
