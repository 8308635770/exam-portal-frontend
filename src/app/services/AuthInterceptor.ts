import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


const TOKEN_HEADER="Authorization";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private lognService:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq=req;

        console.log('interceptor called..')
        //add jwt token
        const token=this.lognService.getToken();
        if(token!=null || token!=''){
            authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }
        return next.handle(authReq);

    }
    
}

// export const AuthInterceptor