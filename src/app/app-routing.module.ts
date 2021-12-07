import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { MonitorComponent } from './monitor/monitor.component';
import { SolicitationCreateComponent } from './solicitations/solicitation-create/solicitation-create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: MonitorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: SolicitationCreateComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
