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

export interface SolicitationHistory {
  id: number | null;
  status: string | null;
  ordem: string | null;
  sku: number | null;
  produto: string | null;
  quantidade: number | null;
  usuário: number | null;
  resposta: string | null;
  nf: string | null;
}

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
  dataSource: SolicitationHistory[] = [];
  columnsToDisplay = [
    'id',
    'status',
    'ordem',
    'sku',
    'produto',
    'quantidade',
    'usuário',
    'resposta',
    'nf',
  ];
  expandedSolicitation: SolicitationHistory | null = null;

  constructor(
    public solicitationService: SolicitationService,
    public responseService: ResponseService
  ) {}

  /* TODO */
  ngOnInit(): void {
    this.responseService.getResponses();
    let responses: any[] = [];
    this.responseService.subject.subscribe((responses) => {
      responses = responses;
    });
    this.solicitationService.subject
      .pipe(
        map((solicitations) => {
          return solicitations.map((solicitation) => {
            return {
              id: solicitation.id,
              status: solicitation.status,
              ordem: solicitation.order,
              sku: solicitation.Product.id,
              produto: solicitation.Product.description,
              quantidade: solicitation.amount,
              usuário: solicitation.User.id,
              resposta: responses.find(
                (r) => r.SolicitationId == solicitation.id
              ),
              nf: solicitation.obs,
            };
          });
        })
      )
      .subscribe((responses) => {
        this.dataSource = responses;
      });
  }
}
