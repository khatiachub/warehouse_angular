import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../core/data-service.service';
@Component({
  selector: 'app-usersmanagment',
  templateUrl: './usersmanagment.component.html',
  styleUrl: './usersmanagment.component.css'
})
export class UsersmanagmentComponent implements OnInit {
  constructor(private dataService:DataServiceService){}

  ngOnInit(): void {
    const id = localStorage.getItem("id");
    console.log(id);
    this.dataService.getUsers(id).subscribe({
      next: (response) => {
        console.log(response); 
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }
}
