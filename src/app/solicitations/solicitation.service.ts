import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  createSolicitation(
    order: string,
    sku: string,
    product: string,
    amount: number,
    center: string
  ) {
    console.log('Created!');
  }
}
