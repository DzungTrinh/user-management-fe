import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  form: FormGroup;                       // declare first

  constructor(
    private fb: FormBuilder,             // DI happens here
    private auth: AuthService
  ) {
    // now fb is assigned, safe to use
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  loading = false;
  errorMsg = '';

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMsg = '';

    this.auth
      .login({
        email: this.form.value.email!,
        password: this.form.value.password!,
        rememberDevice: this.form.value.remember!,
      })
      .subscribe({
        next: () => (this.loading = false), // navigation handled inside service
        error: (err) => {
          this.errorMsg = err?.error?.message ?? 'Login failed';
          this.loading = false;
        },
      });
  }
}
