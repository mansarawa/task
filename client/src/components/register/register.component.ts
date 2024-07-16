
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, HttpClientModule, LoginComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  adminRegister: FormGroup;
  managerRegister: FormGroup;
  userRegister: FormGroup;
  createProject:FormGroup;
  companyRegister:FormGroup;
  company: string = 'company'
  managers: any[] = [];
  isDisable=true;
  cname:any;
  companyname:string='';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
   
    this.cname = JSON.parse(localStorage.getItem('admin') || '{}');
    this.companyname=this.cname.companyname
    console.log(this.cname);
    this.companyRegister = this.fb.group({
      adminname: ['', Validators.required],
      companyname: ['', Validators.required],
      address: ['', Validators.required],
      gst: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.adminRegister = this.fb.group({
      adminname: ['', Validators.required],
      companyname: [this.cname.companyname, Validators.required],
      address: ['', Validators.required],
      gst: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.managerRegister = this.fb.group({
      name: ['', Validators.required],
      companyname: [this.cname.companyname],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });console.log(this.cname)

    this.userRegister = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      companyname: [this.cname.companyname],
      // managerId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      managerName: ['', Validators.required]
    });
    this.createProject = this.fb.group({
      projectname: ['', Validators.required],
      desc: ['', Validators.required],
      deadline: ['',Validators.required],
      manageremail:['',Validators.required],
      managername: ['', Validators.required]
    });
  }

  companySubmit() {
    if (this.companyRegister.valid) {
      console.log("first")
      this.companyService.createAdmin(this.companyRegister.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.removeItem('user');
          localStorage.removeItem('manager');
          localStorage.setItem('admin', JSON.stringify(response.data))
          console.log(response.data)
          this.router.navigate(['company'])
          this.adminRegister.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  adminSubmit() {
    if (this.adminRegister.valid) {
      console.log("first")
      this.companyService.createAdmin(this.adminRegister.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.removeItem('user');
          localStorage.removeItem('manager');
          localStorage.setItem('admin', JSON.stringify(response.data))
          console.log(response.data)
          this.router.navigate(['company'])
          this.adminRegister.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  managerSubmit() {

    if (this.managerRegister.valid) {
      console.log("first")
      this.companyService.createManager(this.managerRegister.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          
          console.log(response.data)
          this.router.navigate(['company'])
          this.managerRegister.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  userSubmit() {
      if (this.userRegister.valid) {
        console.log('Form is valid. Submitting...');
    
        this.companyService.createUser(this.userRegister.value).subscribe(
          response => {
            console.log('Form Submitted', response);
          
            console.log(response.data);
            this.router.navigate(['company']);
            this.userRegister.reset();
          },
          error => {
            console.error('Error:', error);
          }
        );
      } else {
        console.log('Form is invalid. Cannot submit.');
      }
    
    
  }
  projectSubmit() {
    console.log(this.createProject.value)
    if (this.createProject.valid) {
      console.log('Form is valid. Submitting...');
  
      this.companyService.createProject(this.createProject.value).subscribe(
        response => {
          console.log('Form Submitted', response);
        
          console.log(response);
          this.router.navigate(['company']);
          this.createProject.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  
  
}

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      this.name = name !== null ? name : '';
    });
    this.companyService.getMangers(this.cname.companyname).subscribe(
      data => {
        this.managers = data.manager
        console.log(this.managers)
      },
      error => console.error('Error fetching admins', error)
    );

  }
}

