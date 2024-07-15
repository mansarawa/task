import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commonview',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './commonview.component.html',
  styleUrl: './commonview.component.css'
})
export class CommonviewComponent {
  available: any[] = [];
  useravailable: any[] = [];
  id: string = "";
  type: string = "";
  response: string = "";
  item: any = {};
  uleave: any[] = [];
  name: string = '';
  userSheet = false;
  isDisable = true;
  home = true;
  leave = false;
  employee = false;
  yourleave = false;
  project = false;
  userhome = true;
  userleave = false;
  useryourleave = false;
  userproject = false;
  userSheetMenu = false;
  managerSheetMenu = false;
  checkTeam = false;
  managerSheet = false;
  manager: any;
  user: any;
  result: any[] = [];
  applyleave: FormGroup;
  sendUserTimeSheet: FormGroup;
  sendManagerTimeSheet: FormGroup;
  userapplyleave: FormGroup;
  projectData: any;
  managerproject: any[] = [];
  userProjects: any[] = [];
  userTimeSheet: any[] = [];
  managerTimeSheet: any[] = [];
  manageremail: string = '';
  useremail: string = '';
  username: string = '';
  managername:string='';
  projectTeamStatus: { [key: string]: boolean } = {};
  selectedProject: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService, private fb: FormBuilder) {
    this.manager = JSON.parse(localStorage.getItem('manager') || '{}');
    this.managername=this.manager.name;
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.manageremail = this.manager.email;
    this.useremail = this.user.email;
    this.username = this.user.name
    this.applyleave = this.fb.group({
      username: [this.manager.name],
      email: [this.manager.email],
      date: ['', Validators.required],
    })
    this.sendUserTimeSheet = this.fb.group({
      projectname: [this.selectedProject, Validators.required],
      username: [this.user.name],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      timetaken: ['', Validators.required]
    });
    this.sendManagerTimeSheet = this.fb.group({
      projectname: [this.selectedProject, Validators.required],
      managername: [this.manager.name],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      timetaken: ['', Validators.required]
    });
    this.userapplyleave = this.fb.group({
      username: [this.user.name],
      email: [this.user.email],
      date: ['', Validators.required],
    })
  }

  navigateToView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: { type: type } });
  }
  closeModal() {
    if (this.userSheet) {
      this.userSheet = !this.userSheet;
    }
    else {
      this.managerSheet = !this.managerSheet;
    }
  }
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['type'];
      this.name = name !== null ? name : '';
    });
    this.getManagerProjects();
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
      data => {
        this.uleave = data.userLeave
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

    this.companyService.getUserSheet(this.username).subscribe(
      data => {
        this.userTimeSheet = data.existingSheet;
      },
      error => console.error('Error fetching user projects', error)
    );


    this.companyService.getManagerSheet(this.managername).subscribe(
      data => {
        this.managerTimeSheet = data.existingSheet;
      },
      error => console.error('Error fetching user projects', error)
    );

  }
  checkTeamStatus(projectname: string): void {
    this.companyService.checkTeam(projectname).subscribe(
      data => {
        this.projectTeamStatus[projectname] = data.success;
        console.log("checked" + this.checkTeam)
      },
      error => console.error('Error fetching user projects', error)
    );
  }
  getManagerProjects(): void {
    this.companyService.getManagerProject(this.manageremail).subscribe(
      data => {
        this.managerproject = data.project;
        console.log('Fetched project:', this.managerproject);
        this.managerproject.forEach(project => {
          this.checkTeamStatus(project.projectname);
        });
      },
      error => console.error('Error fetching project', error)
    );
  }

  onSubmit() {
    console.log("click")
    if (this.applyleave.valid) {
      this.companyService.applyManagerLeave(this.applyleave.value).subscribe(response => {
        console.log(response.leave)
        this.companyService.getManagerLeaveByEmail(this.manageremail).subscribe(
          data => {
            this.available = data.managerleave;
            console.log('Fetched leave:', this.available);
            this.applyleave.reset();
          },
          error => console.error('Error fetching leave', error)
        );
      }, error => {
        console.log(error)
      }

      )
    }
  }
  onUserSubmit() {
    console.log("click")
    if (this.userapplyleave.valid) {
      this.companyService.applyUserLeave(this.userapplyleave.value).subscribe(response => {
        console.log(response.leave)
        this.companyService.getUserLeaveByEmail(this.useremail).subscribe(
          data => {
            this.useravailable = data.userleave;
            console.log('Fetched leave:', this.useravailable);
            this.userapplyleave.reset();
          },
          error => console.error('Error fetching leave', error)
        );
      }, error => {
        console.log(error)
      }

      )
    }
  }
  userTimeSubmit() {
    if (this.sendUserTimeSheet.valid) {
      this.companyService.sendUserSheet(this.sendUserTimeSheet.value).subscribe(data => {
        console.log(data)
        if (data.success) {

          setTimeout(() => {
            this.closeModal();
          }, 3000);
          this.response = "Your timesheet has been sent !"
        }
        else {

          this.response = "You have already sent the timesheet !"
          setTimeout(() => {
            this.closeModal();
          }, 3000);
        }
      }, error => {
        console.error('Error submitting user sheet', error);
      });
    }
  }
  managerTimeSubmit() {
    console.log(this.sendManagerTimeSheet.value)
    if (this.sendManagerTimeSheet.valid) {
      this.companyService.sendManagerSheet(this.sendManagerTimeSheet.value).subscribe(data => {
        console.log(data)
        if (data.success) {

          setTimeout(() => {
            this.sendManagerTimeSheet.reset();
            this.closeModal();
            this.response = "";
          }, 3000);
          this.response = "Your timesheet has been sent !"
        }
        else {

          this.response = "You have already sent the timesheet !"
          setTimeout(() => {
            this.response="";
            this.closeModal();
            this.response = "";
          }, 3000);
        }
      }, error => {
        console.error('Error submitting user sheet', error);
      });
    }
  }
  navigateToCompany() {
    localStorage.clear();
    this.router.navigate([''])
  }
  homeClick() {
    this.managerSheetMenu = false;
    this.yourleave = false;
    this.project = false
    this.leave = false;
    this.employee = false;
    this.home = !this.home;

  }
  employeeClick() {
    this.managerSheetMenu = false;
    this.yourleave = false;
    this.project = false
    this.leave = false;
    this.employee = !this.employee;
    this.home = false;

  }
  projectClick() {
    this.managerSheetMenu = false;
    this.yourleave = false;
    this.home = false;
    this.employee = false;
    this.leave = false;
    this.project = !this.project;
  }
  leaveClick() {
    this.managerSheetMenu = false;
    this.yourleave = false;
    this.home = false;
    this.project = false;
    this.employee = false;
    this.leave = !this.leave;
  }
  yourleaveClick() {
    this.home = false;
    this.leave = false;
    this.project = false;
    this.employee = false;
    this.managerSheetMenu = false;
    this.yourleave = !this.yourleave;
  }
  managerSheetClick() {
    this.home = false;
    this.leave = false;
    this.project = false;
    this.employee = false;
    this.yourleave = false;
    this.managerSheetMenu = true
  }
  navigateToUserView(item: any, type: string) {
    localStorage.setItem('selectedItem', JSON.stringify({ item, type }));
    this.router.navigate(['/view'], { queryParams: { type: type } });
  }
  navigateToSheet(projectname: string) {
    this.selectedProject = projectname;
    this.sendUserTimeSheet.patchValue({ projectname: this.selectedProject });
    this.userSheet = true;

  }
  navigateToManagerSheet(projectname: string) {
    this.selectedProject = projectname;
    this.sendManagerTimeSheet.patchValue({ projectname: this.selectedProject });
    this.managerSheet = true;
  }
  logoutClick() {
    localStorage.clear();
    console.log('click')
    this.router.navigate([''])
  }
  userhomeClick() {
    this.useryourleave = false;
    this.userproject = false
    this.userleave = false;

    this.userhome = !this.userhome;

  }
  userTimeClick() {
    this.useryourleave = false;
    this.userproject = false
    this.userleave = false;

    this.userhome = false;

    this.userSheetMenu = !this.userSheetMenu
  }
  userprojectClick() {
    this.useryourleave = false;
    this.userhome = false;

    this.userleave = false;
    this.userproject = !this.userproject;
  }

  useryourleaveClick() {
    this.userhome = false;
    this.userleave = false;
    this.userproject = false;
    this.useryourleave = !this.useryourleave;
  }
  createTeam(projectname: any) {

    this.router.navigate(['createteam'], { queryParams: { projectname: projectname } });
  }
  grantLeave(id: any) {
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

  denyLeave(id: any) {
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