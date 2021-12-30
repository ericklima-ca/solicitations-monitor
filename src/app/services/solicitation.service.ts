import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { Product, Solicitation } from 'src/app/models';
import { AuthService } from './auth.service';

interface PostSolicitation {
  order: number;
  amount: number;
  CenterId: number;
  ProductId: number;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  private solicitations: Solicitation[] = [];
  private solicitationsSubject = new Subject<Solicitation[]>();

  productSubject = new Subject<{ ok: boolean; product: Product | undefined }>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socket: Socket
  ) {}

  get subject() {
    return this.solicitationsSubject.asObservable();
  }

  getSolicitations() {
    this.http
      .get<{ solicitations: Solicitation[] }>(
        `https://backend-solicitation.herokuapp.com/api/solicitations/`
      )
      .pipe(
        map((response) => {
          return response.solicitations.map((solicitation) => {
            return {
              id: solicitation.id,
              amount: solicitation.amount,
              order: solicitation.order,
              createdAt: this._formatTimestamp(solicitation.createdAt),
              updatedAt: this._formatTimestamp(solicitation.updatedAt),
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

  getProduct(productId: number) {
    this.http
      .get<{ ok: boolean; message: { product: Product } }>(
        `https://backend-solicitation.herokuapp.com/api/solicitations/new/` +
          productId
      )
      .subscribe({
        next: (response) => {
          this.productSubject.next({
            ok: true,
            product: response.message.product,
          });
        },
        error: () => {
          this.productSubject.next({ ok: false, product: undefined });
        },
      });
  }

  createSolicitation(solicitation: PostSolicitation) {
    this.http
      .post<{ ok: boolean; message: string; solicitation: Solicitation }>(
        `https://backend-solicitation.herokuapp.com/api/solicitations/new`,
        solicitation
      )
      .subscribe({
        next: (_) => {
          this.publishNewSolicitation();
        },
        error: (_) => {
          console.log('error');
        },
      });
  }

  editSolicitation(
    solicitationId: number | null,
    newAmount: { amount: number }
  ) {
    return this.http.put(
      `https://backend-solicitation.herokuapp.com/api/solicitations/edit/` +
        solicitationId +
        '/edit',
      newAmount
    );
  }

  private _formatTimestamp(ts: string) {
    return new Date(ts).toLocaleString();
  }

  deleteSolicitation(solicitationId: number | null) {
    return this.http.delete(
      `https://backend-solicitation.herokuapp.com/api/solicitations/delete/` +
        solicitationId
    );
  }

  private publishNewSolicitation() {
    this.socket.emit('newSolicitation', 'ok');
  }
  private publishNewResponse() {
    this.socket.emit('newResponse');
  }

  sendEmailforResponse(id: number, response: { obs: string }) {
    this.http
      .put<{ ok: boolean; message: string }>(
        `https://backend-solicitation.herokuapp.com/api/solicitations/edit/${id}/response`,
        response
      )
      .subscribe(() => {
        this.publishNewResponse();
      });
  }
}
