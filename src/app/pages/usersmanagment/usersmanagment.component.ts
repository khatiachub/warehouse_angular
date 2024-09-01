import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../core/data-service.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  Id:number|null=null;
  dialogOpen=false;
  selectedUser={} as User;
  roleName='';
  roles = [
    { label: 'Manager', value: 2 },
    { label: 'Operator', value: 3 }
  ];
  warehousesList:Warehouse[] = [];
  users:User[]=[];
  selectedUsers: User[] = [];
  loading: boolean = false;
  searchValue: string = '';

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }
  registrationForm = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl(null),
    mobile: new FormControl<number|null>(null),
    company_id:new FormControl(Number(localStorage.getItem("id"))),
    warehouse_id:new FormControl(null)
  });
  
  showWarehousesList = false;

onRoleChange(event: DropdownChangeEvent): void {
  const selectedRole = event.value;
  this.showWarehousesList = selectedRole === 3;
}

 
  ngOnInit(): void {
    this.Id= Number(localStorage.getItem("id"));    
    this.dataService.getUsers(this.Id).subscribe({
      next: (response) => {
        console.log(response); 
        this.users=response;
      },
      error: (error) => {
        console.log(error);   
      },
    });
    this.dataService.getWarehouses().subscribe({
      next: (response) => {
        console.log(response); 
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

  registerUser():void{
    this.visible=false;
    console.log(this.registrationForm.value);
    
    if (this.registrationForm.valid) {
      this.dataService.registerUser(this.registrationForm.value as UserRegister).subscribe({
        next: (response) => {
          console.log(response); 
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.registrationForm.markAllAsTouched();
    }
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
    console.log(data);
    this.dataService.UpdateUser(data).subscribe({
      next: (response) => {
        console.log(response); 
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }

  
}
