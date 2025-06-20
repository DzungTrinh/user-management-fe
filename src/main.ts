import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/auth.interceptor';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

provideHttpClient(withInterceptors([authInterceptor]));
