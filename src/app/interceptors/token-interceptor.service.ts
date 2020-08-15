import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/mantenaice/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private userService: UserService
    ) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    //VALIDANDO QUE NO SEA NI LOGIN NI REGISTER
    const URL_NO_NEED_TOKEN = [environment.URL_SERVICES + '/users', environment.URL_SERVICES + '/signin']
    const url = req.url
    const method = req.method

    if (method == 'POST' && (url == URL_NO_NEED_TOKEN[0])) {
      return next.handle(req)
    }

    if (url == URL_NO_NEED_TOKEN[1]) {
      return next.handle(req)
    }

    //TOKEN IN HEADERS

    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.userService.getToken()}`
    })

    const reqCloned = req.clone({
      headers
    })
    return next.handle(reqCloned)

  }

}
