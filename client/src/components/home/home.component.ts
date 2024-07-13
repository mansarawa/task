import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,RegisterComponent,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   company:string="company";
   user:string="user";
   manager:string="manager";
   checkPerson=false;
  constructor(private router:Router){
  if( localStorage.getItem('admin') || localStorage.getItem('manager') ||localStorage.getItem('user') ){
    this.checkPerson= true
  }
  }
  navigateToRegister(){
    this.router.navigate(['register'])
  }
  navigateToURegister(){
    this.router.navigate(['uregister'])
  }
  goDashboard(){
    if(localStorage.getItem('admin')){
    this.router.navigate(['company'])

    }
    else if(localStorage.getItem('manager')){
      this.router.navigate(['commonview'], { queryParams: { type: 'manager' } });
    }
    else{
      this.router.navigate(['commonview'], { queryParams: { type: 'user' } });
    }
  }
}
