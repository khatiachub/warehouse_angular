import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../core/data-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRegister, Warehouse } from '../../shared/data-interface';
import { Router } from '@angular/router';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-usersmanagment',
  templateUrl: './usersmanagment.component.html',
  styleUrl: './usersmanagment.component.css'
})
export class UsersmanagmentComponent implements OnInit {
  constructor(private dataService:DataServiceService,private router:Router){}
  visible:boolean=false;
  dialogOpen=false;
  selectedUser={} as User;
  roleName='';
  roles = [
    { label: 'მენეჯერი', value: 2 },
    { label: 'ოპერატორი', value: 3 }
  ];
  warehousesList:Warehouse[] = [];
  users:User[]=[];
  selectedUsers: User[] = [];
  loading: boolean = false;
  searchValue: string = '';
  showWarehousesList = false;
  Id:number= Number(localStorage.getItem("id"));    

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }
  registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    role_id: new FormControl<null|number>(null,[Validators.required]),
    mobile: new FormControl<number|null>(null),
    company_id:new FormControl(Number(localStorage.getItem("id"))),
    warehouse_id:new FormControl(null)
  });
  

onRoleChange(event: DropdownChangeEvent): void {
  const selectedRole = event.value;
  this.showWarehousesList = selectedRole === 3;
}

registerUser():void{
  if (this.registrationForm.valid) {
    if(this.registrationForm.value.role_id===3&&this.registrationForm.value.warehouse_id===null){
      alert('გთხოვთ აირჩიოთ საწყობი');      
      return
    }else{
      this.dataService.registerUser(this.registrationForm.value as UserRegister).subscribe({
        next: (response) => {
          this.getUsers();
          this.visible=false;
        },
        error: (error) => {
          console.log(error);   
          if (error.status === 20001) {
            alert('მომხმარებელი უკვე არსებობს')
          }
        },
      });
    }
  }else{
    this.registrationForm.markAllAsTouched();
  }
}


getUsers(){
  this.dataService.getUsers(this.Id).subscribe({
    next: (response) => {
      this.users=response;      
    },
    error: (error) => {
      console.log(error);   
    },
  });
}
  ngOnInit(): void {    
    this.getUsers();
    this.dataService.getWarehouses(this.Id).subscribe({
      next: (response) => {
        this.warehousesList=response
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }
  
  showDialog():void{
    this.visible=true;    
  }



  editUser(data:User):void{
    this.dialogOpen=true;
    this.selectedUser=data;
    if(data.role==='manager'){
      this.selectedUser.role_id=2
    }else{
      this.selectedUser.role_id=3
    }
  }
  updateUser():void{
    const data={
      id:this.selectedUser.id,
      name:this.selectedUser.name,
      lastname:this.selectedUser.lastname,
      username:this.selectedUser.username,
      mobile:this.selectedUser.mobile,
      role_id:this.selectedUser.role_id
    }
    this.dataService.UpdateUser(data).subscribe({
      next: (response) => {
        this.dialogOpen=false; 
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }

  
}
