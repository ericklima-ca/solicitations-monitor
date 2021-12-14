import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solicitation } from 'src/app/models';
@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  solicitations!: Solicitation[];
  solicitationSubject = new Subject();

  constructor(private http: HttpClient) {}

  createSolicitation(solicitation: Solicitation) {
    this.http
      .post<{ message: string }>(
        'http://localhost/3000/api/solicitaions/new',
        solicitation
      )
      .subscribe(() => {});
  }
}
