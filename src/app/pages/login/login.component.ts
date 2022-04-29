import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = {
    username: '',
    password: '',
  }
  constructor(private matSnackBar: MatSnackBar,private loginService:LoginService,private router:Router,private location:LocationStrategy) { 
      window.history.forward();
  }

  ngOnInit(): void {
  }

  public formSubmit() {
    console.log('login button clicked')
    if (this.user.username.trim() == '' || this.user.username.trim() == null) {
      this.matSnackBar.open("Username is required..", "ok", {
        duration: 2000
      })
      return
    }
    if (this.user.password.trim() == '' || this.user.password.trim() == null) {
      this.matSnackBar.open("Username is required..", "ok", {
        duration: 2000
      })
      return
    }

    //request to server to generate token
    this.loginService.generateToken(this.user).subscribe(
      (data:any)=>{
        console.log("success")
        console.log(data)
        //login
        this.loginService.loginUser(data.token)
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user)
            console.log('user '+user)
            if(this.loginService.getUserRole()=="Admin"){
              this.router.navigate(['/admin-dashboard'])
              this.loginService.loginStatusSubject.next(true)
            }else if(this.loginService.getUserRole()=="Normal"){
              this.router.navigate(['/user-dashboard'])
              this.loginService.loginStatusSubject.next(true)

            }else{
              this.loginService.loggedOut();
              location.reload();
            }
          },
          (error)=>{
            console.log('Error !')
            console.log(error)
          }
        )
      },
      (error)=>{
        console.log('Error !')
        console.log(error)
        this.matSnackBar.open("Invalid credentials..","",{
          duration:2000
        })
      }
    )

  }
}
