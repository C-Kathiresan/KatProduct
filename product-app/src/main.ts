import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ProductsComponent } from './app/components/products/products.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
