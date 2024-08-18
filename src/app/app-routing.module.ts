import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { UsersmanagmentComponent } from './pages/usersmanagment/usersmanagment.component';
import { ProductsmanagmentComponent } from './pages/productsmanagment/productsmanagment.component';
AuthenticationComponent
const routes: Routes = [
  {path:'',component:AuthenticationComponent },
  {path:'usersmanagment',component:UsersmanagmentComponent },
  {path:'productsmanagment',component:ProductsmanagmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
