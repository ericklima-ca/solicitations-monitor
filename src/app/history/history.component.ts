import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SolicitationService } from '../services/solicitation.service';
import { map } from 'rxjs';
import { ResponseService } from '../services/response.service';
import { Solicitation } from '../models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  dataSource: any[] = [];
  columnsToDisplay = [
    'id',
    'status',
    'ordem',
    'sku',
    'quantidade',
    'usuário',
    'resposta',
    'nf',
  ];
  expandedSolicitation: {
    id: any;
    status: any;
    ordem: any;
    sku: any;
    produto: any;
    quantidade: any;
    usuário: any;
    resposta: string;
    nf: any;
  } | null = null;

  constructor(
    public solicitationService: SolicitationService,
    public responseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.responseService.getResponses();

    this.responseService.subject
      .pipe(
        map((responses) => {
          return responses.map((r) => {
            return {
              id: r.Solicitation.id,
              status: r.Solicitation.status,
              ordem: r.Solicitation.order,
              sku: r.Solicitation.Product.id,
              produto: r.Solicitation.Product.description,
              quantidade: r.Solicitation.amount,
              usuário: r.UserId,
              resposta: r.confirmed ? 'Confirmado' : 'NTP',
              nf: r.Solicitation.obs,
            };
          });
        })
      )
      .subscribe((fR) => {
        this.dataSource = fR;
      });
  }
}
