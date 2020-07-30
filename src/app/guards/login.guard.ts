import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../services/mantenaice/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
    ){

  }


  canActivate(    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.userService.isLogged().pipe(
      map(auth=>{
        if(auth){
          return true
        }else{
          this.router.navigateByUrl('/login');
        }
      })
    )

  }

}
