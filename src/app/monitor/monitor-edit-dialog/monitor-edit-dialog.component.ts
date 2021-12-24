import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Solicitation } from "src/app/models";
import { SolicitationService } from "src/app/services/solicitation.service";

@Component({
    templateUrl: './monitor-edit-dialog.component.html'
})
export class MonitorEditDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Solicitation, private solicitationService:SolicitationService) {}

    editSolicitation(amount: number) {
        this.solicitationService
    }
}