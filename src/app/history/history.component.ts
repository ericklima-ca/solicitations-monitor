import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SolicitationService } from '../services/solicitation.service';
import { ResponseService } from '../services/response.service';
import { AuthService } from '../services/auth.service';
import { AuthUser, SolicitationHistory } from '../models';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  currentUser: AuthUser | undefined;
  dataSource: SolicitationHistory[] = [];
  columnsToDisplay = [
    'ref',
    'status',
    'sku',
    'quantidade',
    'usuario',
    'resposta',
    'nf',
    'view',
  ];

  constructor(
    public solicitationService: SolicitationService,
    public responseService: ResponseService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.updateResponses();
  }

  private _setStatus(s: any): { text: string; signal: string } {
    switch (s) {
      case 'finished':
        return { text: 'Finalizada', signal: 'done' };
      default:
        return { text: 'Em faturamento', signal: 'priority_high' };
    }
  }

  private updateResponses() {
    this.responseService.getResponses();

    this.responseService.subject
      .pipe(
        map((responses) => {
          return responses.map((r) => {
            console.log(r);
            return {
              ref: r.Solicitation.id,
              status: this._setStatus(r.Solicitation.status).text,
              ordem: r.Solicitation.order,
              sku: r.Solicitation.Product.id,
              produto: r.Solicitation.Product.description,
              quantidade: r.Solicitation.amount,
              usuario: r.User.name,
              resposta: r.confirmed ? 'Confirmado' : 'NTP',
              nf: r.Solicitation.obs,
              sinal: this._setStatus(r.Solicitation.status).signal,
              data: new Date(r.createdAt).toLocaleString(),
            };
          });
        })
      )
      .subscribe((fR) => {
        this.dataSource = fR.sort((a, b) => {
          if (a.data > b.data) {
            return -1;
          }
          if (a.data < b.data) {
            return 1;
          }
          return 0;
        });
      });
  }

  openDialog(solicitation: SolicitationHistory) {
    const dialogRef = this.dialog.open(HistoryDialogComponent, {
      data: {
        solicitation: { ...solicitation },
        currentUser: this.currentUser,
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.updateResponses();
      }
    });
  }
}
