import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';

declare function init_plugins()
declare const gapi: any

const google_client_id = environment.google_client_id

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  auth2: any

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    init_plugins()
    this.renderButton()

    this.form = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(Boolean(false))
    })

    if(localStorage.getItem('email')){
      this.form.patchValue({email: localStorage.getItem('email'),remember: true})
    }
  }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.getAuthInstance({
        client_id: `${google_client_id}.apps.googleusercontent.com`,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })

      this.attachSignIn(document.getElementById('my-signin2'))

    })
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      const token = googleUser.getAuthResponse().id_token
      this.userService.loginUserGoogle(token).subscribe(()=> this.ngZone.run(() => this.router.navigate(['/dashboard'])))
    })
  }

  login(){
    if(this.form.valid){
      const user = new User(
        null,
        this.form.value.email,
        this.form.value.password
      )
      this.userService.loginUser(user, this.form.value.remember).subscribe(res=> this.router.navigate(['/dashboard']))
    }
    return
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.googleInit();

  }

}