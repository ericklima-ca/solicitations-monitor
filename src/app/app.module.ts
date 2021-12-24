import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SolicitationCreateComponent } from './solicitations/solicitation-create/solicitation-create.component';
import { MonitorComponent } from './monitor/monitor.component';
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MonitorDialogResponseComponent } from './monitor/monitor-dialog-response/monitor-dialog-response.component';
import { RequestsInterceptor } from './services/requests-interceptor.service';
import { SolicitationCreateDialog } from './solicitations/solicitation-create/solicitation-create-dialog/solicitation-create-dialog.component';
import { MonitorEditDialog } from './monitor/monitor-edit-dialog/monitor-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SolicitationCreateComponent,
    MonitorComponent,
    HistoryComponent,
    LoginComponent,
    RegisterComponent,
    MonitorDialogResponseComponent,
    MonitorEditDialog,
    SolicitationCreateDialog,
    
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
