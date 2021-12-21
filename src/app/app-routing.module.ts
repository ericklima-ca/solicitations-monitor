import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HistoryComponent } from './history/history.component';
import { MonitorComponent } from './monitor/monitor.component';
import { SolicitationCreateComponent } from './solicitations/solicitation-create/solicitation-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: MonitorComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'create',
    component: SolicitationCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  //  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
