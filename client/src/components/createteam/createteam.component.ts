import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createteam',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './createteam.component.html',
  styleUrl: './createteam.component.css'
})
export class CreateteamComponent {
  manager:any;
  manageremail:string='';
  placeproject:string='';
  isDisable=true;
  managerproject:any[]=[];
  createTeam:FormGroup;
  constructor(private companyService:CompanyService,private route:ActivatedRoute,private fb:FormBuilder){
    this.manager=JSON.parse(localStorage.getItem('manager') || '{}');
    this.manageremail=this.manager.email
    console.log("createteam"+this.manageremail)
    this.createTeam=this.fb.group({
      projectname:['',Validators.required]
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
    }
    
  }

function ngOnInit() {
  throw new Error('Function not implemented.');
}

