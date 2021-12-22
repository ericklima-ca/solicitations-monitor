import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isAuth = false;
  private authSubs!: Subscription;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (this.authService.token) {
      this.isAuth = true;
    }
    this.authSubs = this.authService.authSubject.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  reload() {
    location.reload();
  }
}
