import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isUserLoggedIn:Boolean=false
  user=null;

  constructor(public loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      console.log("nav bar init..")
      this.isUserLoggedIn=data
      this.user=this.loginService.getUserDetails();
      console.log(data)
    })

  }

  public logOut(){
    console.log("logout..")
    this.loginService.loggedOut()
    // this.isUserLoggedIn=false
    // this.user=null
    this.loginService.loginStatusSubject.next(false);
    this.router.navigate(['login'])
  }

}
