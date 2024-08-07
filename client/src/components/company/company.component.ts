import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewComponent } from '../view/view.component';
import { DataTablesModule } from 'angular-datatables';

import { Subject } from 'rxjs';
import * as $ from 'jquery';
import 'datatables.net';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule,DataTablesModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent  implements OnInit {
  admins:any[]=[];
  mleave:any[]=[];
  managers:any[]=[];
  getproject:any[]=[];
  users:any[]=[];
  managersheet:any[]=[]
  timesheet=false;
  user:string="user"
  company:string="company"
  createadmin="createadmin"
  home=true;
  alladmins=false;
   allmanagers=false;
   allusers=false;
  leave=false;
  project=false;
  dtoptions: Config = {};
  manager:string="manager"
  createproject:string="createproject"
  
  constructor( private companyService: CompanyService,private router:Router){

    if(!localStorage.getItem('admin') ){
      this.router.navigate(['/login'], { queryParams: {  name: "company" } });
    }
  }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    const storedAdmin = localStorage.getItem('admin');
    const adminData = storedAdmin ? JSON.parse(storedAdmin) : [];
    const companyname = adminData.companyname;
    console.log(companyname)
    this.companyService.getAdmins(companyname).subscribe(
      data =>{ this.admins = data.admin
        console.log(this.admins)
      
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getMangers(companyname).subscribe(
      data =>{ this.managers = data.manager
        
        console.log(this.managers)
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getProject(companyname).subscribe(
      data =>{ this.getproject = data.projects
      
        console.log("projects"+this.getproject)
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getUsers(companyname).subscribe(
      data =>{ this.users = data.user
        console.log("users"+this.users)
          
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getManagerLeave(companyname).subscribe(
      data =>{ this.mleave = data.managerLeave
        console.log(this.mleave)
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getAdminManagerSheet(companyname).subscribe(
      data =>{ this.managersheet = data.managerSheets
        console.log(this.managersheet)
      },
      error => console.error('Error fetching admins', error)
    );
  }
  

  deleteAdmin(id:any) {
    this.companyService.dAdmin(id).subscribe(
      data => {
        console.log('Admin deleted', data.message);
        this.admins = this.admins.filter(admin => admin.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
  deleteManager(id:any) {
    this.companyService.dManager(id).subscribe(
      data => {
        console.log('User deleted', data);
        this.managers = this.managers.filter(manager => manager.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
  deleteUser(id:any) {
    this.companyService.dUser(id).subscribe(
      data => {
        console.log('User deleted', data.message);
        this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
  
  navigateToView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: {  type: type } });
  }

  grantLeave(id:any){
    const storedAdmin = localStorage.getItem('admin');
    const adminData = storedAdmin ? JSON.parse(storedAdmin) : [];
    const companyname = adminData.companyname;
    console.log(companyname)
    this.companyService.grantManagerLeave(id).subscribe(
      data => {
        // this.mleave = data.managerLeave
        console.log('leave grant', data.message);
        this.companyService.getManagerLeave(companyname).subscribe(
          data =>{ this.mleave = data.managerLeave
            console.log(this.mleave)
          },
          error => console.error('Error fetching admins', error)
        );
        // this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error grant leave user', error);
      }
    );
  }

  denyLeave(id:any){
    const storedAdmin = localStorage.getItem('admin');
    const adminData = storedAdmin ? JSON.parse(storedAdmin) : [];
    const companyname = adminData.companyname;
    console.log(companyname)
    this.companyService.denyManagerLeave(id).subscribe(
      data => {
        console.log('leave deny', data.message);
        this.companyService.getManagerLeave(companyname).subscribe(
          data =>{ this.mleave = data.managerLeave
            console.log(this.mleave)
          },
          error => console.error('Error fetching admins', error)
        );
        // this.mleave = data.managerLeave
        // this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error deny leave user', error);
      }
    );
  }
  whoIn(): void {
    if (localStorage.getItem('admin')) {
     localStorage.removeItem('manager');
     localStorage.removeItem('user')
    } else if (localStorage.getItem('manager')) {
      localStorage.removeItem('admin');
      localStorage.removeItem('user')
    } else if (localStorage.getItem('user')) {
      localStorage.removeItem('manager');
      localStorage.removeItem('admin')
    } else {
      // Handle case when none of the items are present
      console.log('No valid user found in localStorage');
    }
  }
  homeClick(){
    this.alladmins=true;
    this.allmanagers=false;
    this.allusers=false;
    this.project=false
    this.leave=false;
    this.timesheet=false;

    this.home=true;

  }
  managerClick(){
    this.alladmins=true;
    this.home=false;
    this.allusers=false;
    this.project=false
    this.leave=false;
    this.timesheet=false;
    this.allmanagers=true;
  }
  userClick(){
    this.alladmins=true;
    this.home=false;
    this.allmanagers=false;
    this.project=false
    this.leave=false;
    this.timesheet=false;
    this.allusers=true;
  }
  projectClick(){
    this.alladmins=false;
    this.allmanagers=false;
    this.allusers=false;
    this.home=false;
    this.timesheet=false;
    this.leave=false;
    this.project=true;
  }
  timeSheet(){
    this.alladmins=false;
    this.allmanagers=false;
    this.allusers=false;
    this.home=false;
    this.timesheet=true;
    this.leave=false;
    this.project=false;
  }
  leaveClick(){
    this.alladmins=false;
    this.allmanagers=false;
    this.allusers=false;
    this.home=false;
    this.project=false
    this.leave=!this.leave;
  }
 
  logoutClick(){
    localStorage.clear();
    console.log('click')
    this.router.navigate([''])
  }
}
