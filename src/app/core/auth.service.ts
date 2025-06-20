import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';


interface LoginDto {
  email: string;
  password: string;
  rememberDevice: boolean;
}

interface LoginResponse {
  accessToken: string;          // JWT (or opaque) for API calls
  mfaRequired: boolean;
  deviceId?: string;            // returned on successful MFA or first login
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** holds JWT so interceptor can read it */
  token = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /** POST /auth/login  */
  login(dto: LoginDto) {
    return this.http
      .post<LoginResponse>(`${environment.apiBase}/auth/login`, dto)
      .pipe(
        tap(res => {
          if (res.deviceId) {
            // store deviceId cookie for future “trusted device” checks
            document.cookie = `device_id=${res.deviceId}; Secure; SameSite=Strict`;
          }

          if (res.mfaRequired) {
            // store temp token if backend issues a short‑lived pre‑MFA token
            this.token.set(res.accessToken);
            this.router.navigate(['/mfa']);
          } else {
            this.finishLogin(res.accessToken);
          }
        })
      );
  }

  /** Called after MFA passes or when MFA not required */
  finishLogin(accessToken: string) {
    this.token.set(accessToken);
    localStorage.setItem('accessToken', accessToken);    // optional “remember me”
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
