import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../../core/data-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  constructor(private dataService:DataServiceService,private router:Router){}

  showloginform:boolean=true;
  showregform:boolean=false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    company_name: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl('')
  });

  login():void{
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.dataService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response); 
          localStorage.setItem('token', response.token)
          localStorage.setItem('id', response.id);
          this.router.navigate(response.role==='admin'?["usersmanagment"]:["productsmanagment"])
          // this.showloginform=false;
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
  registration():void{
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      this.dataService.registerCompany(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log(response); 
         
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  clickLogin():void{
    this.showloginform=true;
    this.showregform=false;
  }
  clickRegister():void{
    this.showloginform=false;
    this.showregform=true;
  }
}
