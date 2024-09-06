import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'warehouse_angular';
  authenticationpage:boolean=false;
  constructor(private router:Router){}

  logOut():void{
    localStorage.clear();
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter(
        (event): event is NavigationEnd => event instanceof NavigationEnd
      )
    )
    .subscribe((event: NavigationEnd) => {
     if(event.url==='/'){
      this.authenticationpage=true
     }else{
      this.authenticationpage=false;
     }
    });
    
  }

}
