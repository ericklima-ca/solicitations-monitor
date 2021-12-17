import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitationService } from './solicitation.service';

@Injectable({ providedIn: 'root' })
export class ResponseService {
  constructor(
    public http: HttpClient,
    public solicitationService: SolicitationService
  ) {}

  respondSolicitation(id: number, response: string) {
    this.http
      .get<{ message: string }>(
        `http://localhost:3000/api/responses/${id}/${response}`
      )
      .subscribe(() => {
        this.solicitationService.getSolicitations();
      });
  }
}
