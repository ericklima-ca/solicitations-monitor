import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Center, Product, Solicitation } from 'src/app/models';
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
  private solicitations!: Solicitation[];
  private solicitationsSubject = new Subject<Solicitation[]>();
  productSubject = new Subject<{ ok: boolean; product: Product | undefined }>();

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
        'http://localhost:3000/api/solicitations/new/' + productId
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
      .post<{ ok: boolean; message: string }>(
        'http://localhost:3000/api/solicitations/new',
        solicitation
      )
      .subscribe({
        error: (response) => {
          console.log(response);
        },
      });
  }

  private _formatTimestamp(ts: string) {
    const date = new Date(ts).toLocaleDateString();
    const time = new Date(ts).toLocaleTimeString();
    return `${date} ${time}`;
  }
}
