import { Component, OnDestroy, OnInit } from '@angular/core';
import { Solicitation, AuthUser } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MonitorDialogResponseComponent } from './monitor-dialog-response/monitor-dialog-response.component';
import { SolicitationService } from '../services/solicitation.service';
import { solicitations } from './_helper.dev';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit, OnDestroy {
  user?: AuthUser;
  authSubs = new Subscription();
  solicitationSubs = new Subscription();
  solicitations?: Solicitation[];
  amount = 0;

  constructor(
    public dialog: MatDialog,
    public solicitationService: SolicitationService,
    public authService: AuthService
  ) {}

  openDialog(response: string, solicitation: Solicitation) {
    const dialogRef = this.dialog.open(MonitorDialogResponseComponent, {
      data: {
        SolicitationId: solicitation.id,
        product: solicitation.Product.description,
        amount: solicitation.amount,
        sku: solicitation.Product.id,
        response: response,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.authSubs = this.authService.authSubject.subscribe((auth) => {
      if (!auth) {
        this.user = undefined;
      }
    });
    this.solicitationService.getSolicitations();
    this.solicitationService.subject.subscribe((solicitations) => {
      console.log(solicitations);
      this.solicitations = solicitations.reverse();
      this.amount = this.solicitations.length;
      console.log(this.solicitations);
    });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
    this.solicitationSubs.unsubscribe();
  }
}
