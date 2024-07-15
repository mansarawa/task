import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commonview',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './commonview.component.html',
  styleUrl: './commonview.component.css'
})
export class CommonviewComponent {
  available:any[]=[];
  useravailable:any[]=[];
  id: string = "";
  type: string = "";
  item: any = {};
  uleave:any[]=[];
  name:string='';
  userSheet=false;
  isDisable=true;
  home=true;
  leave=false;
  employee=false;
  yourleave=false;
  project=false;
  userhome=true;
  userleave=false;
  useryourleave=false;
  userproject=false;
  manager:any;
  user:any;
  result:any[]=[];
  applyleave:FormGroup;
  sendUserTimeSheet:FormGroup;
  userapplyleave:FormGroup;
  
  managerproject:any[]=[];
  userProjects:any[]=[];
  manageremail: string = '';
  useremail:string='';
  username:string='';
  projectData:any;
  constructor(private route: ActivatedRoute,private router:Router,private companyService:CompanyService,private fb:FormBuilder) {
    this.manager = JSON.parse(localStorage.getItem('manager') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.projectData=JSON.parse(localStorage.getItem('projectname') || '{}');
    console.log(this.projectData)
    this.manageremail = this.manager.email;
    this.useremail=this.user.email;
    this.username=this.user.name
    this.applyleave=this.fb.group({
       username:[this.manager.name],
       email:[this.manager.email],
      date: ['', Validators.required],
    })
    this.sendUserTimeSheet=this.fb.group({
      projectname:[''],
      username:[''],
      title:[''],
      desc:[''],
      timetaken:['']
    })
    this.userapplyleave=this.fb.group({
      username:[this.user.name],
      email:[this.user.email],
     date: ['', Validators.required],
   })
  }
  
  navigateToView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: {  type: type } });
  }
 
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
          const name = params['type'];
        this.name = name !== null ? name : '';
        });
        this.companyService.getManagerProject(this.manageremail).subscribe(
          data => {
            this.managerproject = data.project;
            console.log('Fetched project:', this.managerproject);
          },
          error => console.error('Error fetching project', error)
        );
    this.companyService.getUsers().subscribe(
      data => {
        this.result = data.user;
        console.log('Fetched users:', this.result);
      },
      error => console.error('Error fetching admins', error)
    );
    this.companyService.getManagerLeaveByEmail(this.manageremail).subscribe(
      data => {
        this.available = data.managerleave;
        console.log('Fetched leave:', this.available);
      },
      error => console.error('Error fetching leave', error)
    );
   
    this.companyService.getUserLeaveByEmail(this.useremail).subscribe(
      data => {
        this.useravailable = data.userleave;
        console.log('Fetched leave for user:', this.useravailable);
      },
      error => console.error('Error fetching leave', error)
    );
    this.companyService.getUserLeave().subscribe(
      data =>{ this.uleave = data.userLeave
        console.log(this.uleave)
      },
      error => console.error('Error fetching admins', error)
    );
    
      this.companyService.getUserProjects(this.username).subscribe(
        data => {
          this.userProjects = data.projects;
          console.log("User projects:", this.userProjects);
        },
        error => console.error('Error fetching user projects', error)
      );
    
    
  }
  onSubmit(){
    console.log("click")
    if(this.applyleave.valid)
      {
        this.companyService.applyManagerLeave(this.applyleave.value).subscribe(response=>{
            console.log(response.leave)
            this.companyService.getManagerLeaveByEmail(this.manageremail).subscribe(
              data => {
                this.available = data.managerleave;
                console.log('Fetched leave:', this.available);
                this.applyleave.reset();
              },
              error => console.error('Error fetching leave', error)
            );
        },error=>{
          console.log(error)
        }

        )
      }
  }
  onUserSubmit(){
    console.log("click")
    if(this.userapplyleave.valid)
      {
        this.companyService.applyUserLeave(this.userapplyleave.value).subscribe(response=>{
            console.log(response.leave)
            this.companyService.getUserLeaveByEmail(this.useremail).subscribe(
              data => {
                this.useravailable = data.userleave;
                console.log('Fetched leave:', this.useravailable);
                this.userapplyleave.reset();
              },
              error => console.error('Error fetching leave', error)
            );
        },error=>{
          console.log(error)
        }

        )
      }
  }
  usetTimeSubmit(){
    
  }
  navigateToCompany(){
    localStorage.clear();
    this.router.navigate([''])
  }
  homeClick(){
    this.yourleave=false;
    this.project=false
    this.leave=false;
    this.employee=false;
    this.home=!this.home;

  }
  employeeClick(){
    this.yourleave=false;
    this.project=false
    this.leave=false;
    this.employee=!this.employee;
    this.home=false;

  }
  projectClick(){
    this.yourleave=false;
    this.home=false;
    this.employee=false;
    this.leave=false;
    this.project=!this.project;
  }
  leaveClick(){
    this.yourleave=false;
    this.home=false;
    this.project=false;
    this.employee=false;
    this.leave=!this.leave;
  }
  yourleaveClick(){
    this.home=false;
    this.leave=false;
    this.project=false;
    this.employee=false;
    this.yourleave=!this.yourleave;
  }
  navigateToUserView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: {  type: type } });
  }
  navigateToSheet(projectname:string){
    this.userSheet=true
    localStorage.setItem('projectname',JSON.stringify(projectname))
  }
  logoutClick(){
    localStorage.clear();
    console.log('click')
    this.router.navigate([''])
  }
  userhomeClick(){
    this.useryourleave=false;
    this.userproject=false
    this.userleave=false;

    this.userhome=!this.userhome;

  }
  userprojectClick(){
    this.useryourleave=false;
    this.userhome=false;
  
    this.userleave=false;
    this.userproject=!this.userproject;
  }
  
  useryourleaveClick(){
    this.userhome=false;
    this.userleave=false;
    this.userproject=false;
    this.useryourleave=!this.useryourleave;
  }
  createTeam(projectname:any){

    this.router.navigate(['createteam'], { queryParams:   {projectname:projectname}  });
  }
  grantLeave(id:any){
    this.companyService.grantUserLeave(id).subscribe(
      data => {
        console.log('leave grant', data.message);
        // this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error grant leave user', error);
      }
    );
  }

  denyLeave(id:any){
    this.companyService.denyUserLeave(id).subscribe(
      data => {
        console.log('leave deny', data.message);
        // this.users = this.users.filter(user => user.id !== id);
      },
      error => {
        console.error('Error deny leave user', error);
      }
    );
  }
}