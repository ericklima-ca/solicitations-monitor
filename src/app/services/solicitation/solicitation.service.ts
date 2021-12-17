import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Center, Product, Solicitation } from 'src/app/models';

interface ResponseData {
  solicitations: any[];
  products: any[];
}

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  solicitations!: Solicitation[];
  solicitationsSubject = new Subject<Solicitation[]>();
  // url: string = `https://${process.env['HEROKU_APP_NAME']}.herokuapp.com`;

  constructor(public http: HttpClient) {}

  getSolicitationsSubject() {
    return this.solicitationsSubject.asObservable();
  }

  getSolicitations() {
    this.http
      .get<{ solicitations: Solicitation[] }>(
        'http://localhost:3000/api/solicitations/'
      )
      .subscribe((response) => {
        this.solicitations = response.solicitations;
        this.solicitationsSubject.next([...this.solicitations]);
      });
  }

  createSolicitation(solicitation: Solicitation) {
    this.http
      .post<ResponseData>(
        'http://localhost:3000/api/solicitations/new',
        solicitation
      )
      .subscribe(() => {});
  }
}
