import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UsersmanagmentComponent } from './pages/usersmanagment/usersmanagment.component';
import { ProductsmanagmentComponent } from './pages/productsmanagment/productsmanagment.component';
import { AuthInterceptor } from './core/interceptor';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    UsersmanagmentComponent,
    ProductsmanagmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideClientHydration(),provideHttpClient(),provideHttpClient(withInterceptors([AuthInterceptor])) ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
