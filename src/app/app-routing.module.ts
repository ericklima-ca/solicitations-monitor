import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HistoryComponent } from './history/history.component';
import { MonitorComponent } from './monitor/monitor.component';
import { SolicitationCreateComponent } from './solicitations/solicitation-create/solicitation-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { NonAuthGuard } from './services/non-auth.guard';
import { AuthCenterGuard } from './services/auth-center.guard';

const routes: Routes = [
  { path: '', component: MonitorComponent, canActivate: [AuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  {
    path: 'create',
    component: SolicitationCreateComponent,
    canActivate: [AuthGuard, AuthCenterGuard],
  },
  //  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NonAuthGuard, AuthCenterGuard],
})
export class AppRoutingModule {}
