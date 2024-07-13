import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-createteam',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgMultiSelectDropDownModule],
  templateUrl: './createteam.component.html',
  styleUrl: './createteam.component.css'
})
export class CreateteamComponent {
  manager:any;
  manageremail:string='';
  placeproject:string='';
  isDisable=true;
  users:any[]=[];
  filteredUsers: any[] = [];
  managerproject:any[]=[];
  dropdownSettings = {};
  createTeam:FormGroup;
  constructor(private companyService:CompanyService,private router:Router,private route:ActivatedRoute,private fb:FormBuilder){
    this.manager=JSON.parse(localStorage.getItem('manager') || '{}');
    this.manageremail=this.manager.email
    console.log("createteam"+this.manageremail)
    this.createTeam=this.fb.group({
      projectname:['',Validators.required],
      users: [[], Validators.required]
    })
  }
    ngOnInit(){
      this.companyService.getManagerProject(this.manageremail).subscribe(
        data => {
          this.managerproject = data.project;
          console.log('Fetched project:', this.managerproject);
          this.route.queryParams.subscribe(params => {
            const projectName = params['projectname'];
            if (projectName) {
              this.placeproject=projectName
              console.log(projectName)
                this.createTeam.patchValue({ projectname: projectName });
              }
            }
          );
        },
        error => console.error('Error fetching project', error)
      );
      this.companyService.getUsers().subscribe(
        data =>{ this.users = data.user
          console.log(this.users)
          this.filterUsers(); 
        },
        error => console.error('Error fetching admins', error)
      );
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };
    }
   create() {
    const selectedUserNames = this.createTeam.value.users.map((user: any) => user.name);
    const formData = {
      projectname: this.createTeam.value.projectname,
      users: selectedUserNames
    };
    console.log("Form data being sent:", formData);
    this.companyService.createProjectTeam(formData).subscribe(data => {
      console.log("Team created:", data.team);
      this.router.navigate(['commonview'], { queryParams: { type: 'manager' } });
    });
  }
    filterUsers() {
      this.filteredUsers = this.users.filter(user => user.managerName === this.manager.name);
      console.log("filter"+this.filteredUsers)
    }
    
  }

