import { Component, OnDestroy, OnInit } from '@angular/core';
import { Solicitation, AuthUser } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MonitorDialogResponseComponent } from './monitor-dialog-response/monitor-dialog-response.component';
import { SolicitationService } from '../services/solicitation.service';
import { AuthService } from '../services/auth.service';
import { from, Observable, of, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MonitorEditDialog } from './monitor-edit-dialog/monitor-edit-dialog.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit, OnDestroy {
  user?: AuthUser;
  authSubs = new Subscription();
  solicitationSubs = new Subscription();
  newSolicitationSubs = new Subscription();
  solicitations: Solicitation[] = [];
  amount = 0;

  constructor(
    public dialog: MatDialog,
    public solicitationService: SolicitationService,
    public authService: AuthService,
    private socket: Socket
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
    dialogRef.afterClosed().subscribe();
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.authSubs = this.authService.authSubject.subscribe((auth) => {
      if (!auth) {
        this.user = undefined;
      }
    });
    this.updateMonitor();
    this.socket.connect();
    this.socket.fromEvent<any>('newSolicitation').subscribe(() => {
      this.updateMonitor();
    });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
    this.solicitationSubs.unsubscribe();
    this.newSolicitationSubs.unsubscribe();
  }

  openEditDialog(solicitation: Solicitation) {
    const dialogRef = this.dialog.open(MonitorEditDialog, {
      data: {
        ...solicitation,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  onDeleteSolicitation(solicitation: Solicitation) {
    if (confirm(`Deletar solicitação #${solicitation.id}?`)) {
      this.solicitationService
        .deleteSolicitation(solicitation.id)
        .subscribe(() => {
          alert(`Solicitação #${solicitation.id} deletada`);
          this.solicitationService.getSolicitations();
        });
    }
  }

  private updateMonitor() {
    this.solicitationService.getSolicitations();
    this.solicitationSubs = this.solicitationService.subject.subscribe(
      (solicitations) => {
        this.solicitations = solicitations;
        this.amount = this.solicitations.length;
      }
    );
  }
}
