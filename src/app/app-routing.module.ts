import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoryComponent } from "./history/history.component";
import { MonitorComponent } from "./monitor/monitor.component";
import { SolicitationCreateComponent } from "./solicitations/solicitation-create/solicitation-create.component";

const routes: Routes = [
  {path: '', component: MonitorComponent},
  {path: 'create', component: SolicitationCreateComponent},
  {path: 'history', component: HistoryComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
