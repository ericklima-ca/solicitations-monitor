import { Component, OnDestroy, OnInit } from '@angular/core';
import { Solicitation, AuthUser } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MonitorDialogResponseComponent } from './monitor-dialog-response/monitor-dialog-response.component';
import { SolicitationService } from '../services/solicitation.service';
import { solicitations } from './_helper.dev';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit, OnDestroy {
  user?: AuthUser;
  authSubs = new Subscription();
  constructor(
    public dialog: MatDialog,
    public solicitationService: SolicitationService,
    public authService: AuthService
  ) {}
  solicitations = solicitations;

  openDialog(response: string) {
    const dialogRef = this.dialog.open(MonitorDialogResponseComponent, {
      data: {
        SolicitationId: 1031313,
        product: 'SMARTPHONE MOTOROLA G20 VD',
        amount: 10,
        sku: '202021',
        response: response,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  amount = solicitations.length;

  ngOnInit() {
    this.user = this.authService.user;
    this.authSubs = this.authService.authSubject.subscribe((auth) => {
      if (!auth) {
        this.user = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }
}
