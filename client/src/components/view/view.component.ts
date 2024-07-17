import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  standalone: true,
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // Import CommonModule here
})
export class ViewComponent implements OnInit {
  id: string = "";
  type: string = "";
  item: any = {};
  isDisable = true;
  managerIn=false;
  adminUpdate: FormGroup;
  userUpdate: FormGroup;
  managerUpdate: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {
    this.adminUpdate = this.fb.group({
      id: [this.item.id],
      companyname: [this.item.companyname],
      address: [this.item.address, Validators.required],
      adminname: [this.item.adminname, Validators.required],
      email: [this.item.email, Validators.required],
      password: [this.item.password, Validators.required],
      gst: [this.item.gst, Validators.required],
    });

    this.managerUpdate = this.fb.group({
      id: [this.item.id],
      name: [this.item.name, Validators.required],
      email: [this.item.email, [Validators.required, Validators.email]],
      password: [this.item.password, Validators.required],
      role: [this.item.role, Validators.required]
    });


  this.userUpdate = this.fb.group({
    id: [this.item.id],
    name: [this.item.name, Validators.required],
    salary: [this.item.salary, Validators.required],
    email: [this.item.email, [Validators.required, Validators.email]],
    password: [this.item.password, Validators.required],
    managerName: [this.item.managerName]  
  });
  if(localStorage.getItem('manager')){
    this.managerIn=true;
  }


  }

  adminSubmit() {
    if (this.adminUpdate.valid) {
      const formData = this.adminUpdate.value;
      if (!formData.id) {
        formData.id = this.item.id;
      }
      console.log('Admin Update Form Data:', formData); // Log form data
      this.companyService.uAdmin(formData).subscribe(
        response => {
          console.log('Form Submitted', response);
          
          if(localStorage.getItem('admin')){
            
            console.log("admin in")
            this.router.navigate(['company']);
          }
          else{
          this.navigateToCompany();
          }
          console.log(response.admin);
          
          this.adminUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  managerSubmit() {
    if (this.managerUpdate.valid) {
      this.companyService.uManager(this.managerUpdate.value).subscribe(
        response => {
          console.log('Form Submitted', response.manager);
      
          if(localStorage.getItem('manager')){
            
            console.log("manager in")
            this.router.navigate(['commonview'], { queryParams: { type: 'manager' } });
          }
          else{
          this.navigateToCompany();
          }
          this.managerUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  userSubmit() {
    if(!localStorage.getItem('manager'))
    {
    if (this.userUpdate.valid) {
      this.companyService.uUser(this.userUpdate.value).subscribe(
        response => {
          console.log('Form Submitted', response.User);
          
          if(localStorage.getItem('user')){
            
            console.log("user in")
            this.router.navigate(['commonview'], { queryParams: { type: 'user' } });
          }
          else if(localStorage.getItem('admin')){
            this.router.navigate(['company']);
          }
          else{
          this.navigateToCompany();
          }
          this.userUpdate.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }}
    else{
      this.router.navigate(['commonview'], { queryParams: { type: 'manager' } });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || '';
      this.type = params['type'] || '';
      
      try {
        const storedData = JSON.parse(localStorage.getItem('selectedItem') || '{}');
        this.item = storedData.item || {};
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        this.item = {}; 
      }

      console.log(this.item);

     
      this.adminUpdate.patchValue(this.item);
      this.managerUpdate.patchValue(this.item);
      this.userUpdate.patchValue(this.item);
      
    });
  }

  navigateToCompany() {
    if(localStorage.getItem('manager'))
    {
      this.router.navigate(['commonview'], { queryParams: { type: 'manager' } });
    }
    
    else{
    // localStorage.clear();
    // alert("Please Login again")
    this.router.navigate(['company'])
    }
  }
}
