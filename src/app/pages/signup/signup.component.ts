import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {

    if ((this.user.username == '' || this.user.username == null) &&
      (this.user.password == '' || this.user.password == null) &&
      (this.user.firstName == '' || this.user.firstName == null) &&
      (this.user.lastName == '' || this.user.lastName == null) &&
      (this.user.email == '' || this.user.email == null) &&
      (this.user.phone == '' || this.user.phone == null)) {
      this.snackBar.open("All fields are required..!", "ok", {
        duration: 3000
      })
    } else {
      this.userService.addUser(this.user).subscribe(
        (data) => {
          console.log(data);
          // alert("success");
          this.successAlert();
          this.clearAllFields(this.user)
        },
        (error) => {
          console.log(error);
          // alert("failed")
          this.failureAlert(error)
          this.clearAllFields(this.user);
        }
      )
    }
  }

  public successAlert(){
    Swal.fire({
      icon: 'success',
      text: `${this.user.username} is succesfully registered to exam portal`,
      footer: 'please wait for admin approval'
    })
  }

  public failureAlert(error:any){
    Swal.fire({
      icon: 'error',
      text: `${this.user.username} is failed to registered to exam portal`,
      footer: `<b>Error:</b> ${error.error}`
    })
  }

  public clearAllFields(obj){
    for(let key in obj){
      obj[key]='';
    }
  }

  

}             
