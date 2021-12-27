import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Response } from '../models';
import { SolicitationService } from './solicitation.service';

@Injectable({ providedIn: 'root' })
export class ResponseService {
  private responsesSubject = new Subject<any[]>();
  constructor(
    public http: HttpClient,
    public solicitationService: SolicitationService
  ) {}

  respondSolicitation(id: number, response: string) {
    return this.http.get<{ ok: boolean; message: string }>(
      `https://backend-solicitation.herokuapp.com/api/responses/${id}/${response}`
    );
  }

  getResponses() {
    this.http
      .get<{ ok: boolean; responses: any[] }>(
        'https://backend-solicitation.herokuapp.com/api/responses/'
      )
      .subscribe((response) => {
        this.responsesSubject.next(response.responses);
      });
  }

  get subject() {
    return this.responsesSubject.asObservable();
  }
}
