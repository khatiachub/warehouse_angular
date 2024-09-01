import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UsersmanagmentComponent } from './pages/usersmanagment/usersmanagment.component';
import { ProductsmanagmentComponent } from './pages/productsmanagment/productsmanagment.component';
import { AuthInterceptor } from './core/interceptor';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
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
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    FormsModule,
    TabViewModule
  ],
  providers: [provideClientHydration(),provideHttpClient(),provideHttpClient(withInterceptors([AuthInterceptor])) ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
