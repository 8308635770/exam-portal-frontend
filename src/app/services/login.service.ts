import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<Boolean>();

  constructor(private http:HttpClient) { }


  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  //set token in local storage
  public loginUser(token: any){
    localStorage.setItem('token',token)
    // this.loginStatusSubject.next(true);
    return true;
  }

  //user is logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token')
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false
    }else{
      return true;
    }
  }

  //remove token from local storage
  public loggedOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  public getToken():String{
    return localStorage.getItem('token')
  }

  //save userDetails
  public setUser(user:Object){
    localStorage.setItem('user',JSON.stringify(user))
  }

  //getUserDetails
  public getUserDetails(){
    let userStr=localStorage.getItem('user')
    if(userStr!=null){
      return JSON.parse(userStr)
    }else{
      this.loggedOut();
      return null
    }
  }


  public getUserRole(){
    let user=this.getUserDetails();
    return user.authorities[0].authority
  }



}
