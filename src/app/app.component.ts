import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'warehouse_angular';
  constructor(private router:Router){}

  logOut():void{
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
