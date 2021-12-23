import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Center, Product, Solicitation } from 'src/app/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  private solicitations!: Solicitation[];
  private solicitationsSubject = new Subject<Solicitation[]>();
  // url: string = `https://${process.env['HEROKU_APP_NAME']}.herokuapp.com`;

  constructor(public http: HttpClient, private authService: AuthService) {}

  get subject() {
    return this.solicitationsSubject.asObservable();
  }

  getSolicitations() {
    this.http
      .get<{ solicitations: Solicitation[] }>(
        'http://localhost:3000/api/solicitations/'
      )
      .pipe(
        map((response) => {
          return response.solicitations.map((solicitation) => {
            return {
              id: solicitation.id,
              amount: solicitation.amount,
              order: solicitation.order,
              createdAt: this._formatTimeStamp(solicitation.createdAt),
              updatedAt: this._formatTimeStamp(solicitation.updatedAt),
              Product: solicitation.Product,
              User: solicitation.User,
              Center: solicitation.Center,
              status: solicitation.status,
              obs: solicitation.obs,
            };
          });
        })
      )
      .subscribe({
        next: (solicitations) => {
          this.solicitations = solicitations;
          this.solicitationsSubject.next([...this.solicitations]);
        },
        error: (error) => {
          if (error.status == 401) {
            this.authService.logout();
          }
        },
      });
  }

  createSolicitation(solicitation: Solicitation) {
    this.http
      .post<{}>('http://localhost:3000/api/solicitations/new', solicitation)
      .subscribe(() => {});
  }

  private _formatTimeStamp(ts: string) {
    const date = new Date(ts).toLocaleDateString();
    const time = new Date(ts).toLocaleTimeString();
    return `${date} ${time}`;
  }
}
