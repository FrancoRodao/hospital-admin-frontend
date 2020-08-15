import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/mantenaice/user/user.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';

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
  public auth2: any

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone,
    private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    init_plugins()
    this.renderButton()

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(Boolean(false))
    })

    if (localStorage.getItem('email')) {
      this.form.patchValue({ email: localStorage.getItem('email'), remember: true })
    }
  }




  // this.userService.loginUserGoogle(token).subscribe((res: any)=> {
  //   console.log('res',res)
  //   this.ngZone.run(()=>{
  //     this.router.navigate(['/dashboard'])
  //   })
  // })

  login() {
    if (this.form.valid) {
      const user = new User(
        null,
        this.form.value.email,
        this.form.value.password
      )
      this.userService.loginUser(user, this.form.value.remember)
        .subscribe(
          res => {
            this.ngZone.run( () => {
              this.router.navigateByUrl('/dashboard');
            })
          },
        )
    }
    return
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp()

  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginUserGoogle(id_token).subscribe(() => {
          // Navegar al Dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/dashboard');
          })
        },(err)=>{
          this.snackBar.snackBarError('Unexpected error, please contact the developers', '', 8000)
        })
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '417176898686-61gm6i9gkk1js2ivk9rtb3v7ef1qa8g4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };


}