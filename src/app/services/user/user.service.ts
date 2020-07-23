import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from "@angular/common/http";
import { map, tap, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/snackbar.service';
import { environment } from 'src/environments/environment';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.URL_SERVICES
  user: User

  constructor(
    private http: HttpClient,
    private snackBar: SnackbarService,
    private router: Router,
  ) {

    this.loadUserInfo()

  }

  registerUser(user: User){

    const url = this.url+'/users'

    return this.http.post(url,user).pipe(map((res: any)=>{
      this.snackBar.snackBar('¡Registered user!','',3000)
      return res.user
    }))
  }

  saveUser(token: string,user: User){

    this.user = User.instanceUser(user)
    localStorage.setItem('token',token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  loadUserInfo(){
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      this.user = User.instanceUser(JSON.parse(localStorage.getItem('user')))
    }else{
      this.logout()
      return
    }
  }

  editUser(user: User){
    const url = this.url+`/users`
    return this.http.put(url, user)
    .pipe(map((res: any)=> {
        this.saveUser(localStorage.getItem('token'),res.user)
        this.loadUserInfo()
        this.snackBar.snackBar('¡Updated User!','',3000)
        return true
    }))
  }

  loginUser(user: User, remember: boolean){
    const url = this.url+'/signin'

    if(remember){
      localStorage.setItem('email',user.email)
    }else{
      localStorage.removeItem('email')
    }

    return this.http.post(url, user).pipe(map((res: any)=>{
      this.saveUser(res.message.token,res.message.user)
      this.loadUserInfo()
      return true
    }))
  }

  loginUserGoogle(token: string){
    const url = this.url+'/signin/google'
    return this.http.post(url, {token}).pipe(map((res: any)=>{
      this.saveUser(res.token,res.user)
      this.loadUserInfo()
      return true
    }))
  }

  logout(){
    this.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  getToken(): string{
    return localStorage.getItem('token')
  }

  searchUsers(term: string, page: number){
    const url = environment.URL_SERVICES+`/collection/users/${term}?page=${page}`
    return this.http.get(url).pipe(map(res=>{
      return {
        search: res,
        lastSearch: url
      }
    }))
  }

  deleteUser(id: string){
    const url = environment.URL_SERVICES+`/deleteUser/${id}`
    return this.http.delete(url).pipe(map((res: any)=>{
      return res.message
    }))
  }

  getAllUsers(page: number = 1){
    const url = environment.URL_SERVICES+`/users?page=${page}`
    return this.http.get(url)
  }

  changeRole(id: string,role: string){
    const url = environment.URL_SERVICES+`/changeRole/${id}`
    const body = {
      "role": role
    }
    return this.http.put(url,body)
  }

  isLogged(): Observable<boolean>{
    //VALIDA EL TOKEN LO RENUEVA Y REGRESA TRUE O FALSE DEPENDIENDOD E SI EL TOKEN ES VLAIDO
    const url = environment.URL_SERVICES+`/login/renew`
    return this.http.get(url).pipe(
      map( (res: any) => {
        this.saveUser(res.token,res.user)
        return true;
      }),
      catchError( err => {
        return of(false)
      })
    )
  }
}
