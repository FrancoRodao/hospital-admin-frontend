import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

declare function init_plugins()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  passwordSame(password1: string, password2: string){
    return (group: FormGroup) =>{

      const pass1 = group.controls[password1].value
      const pass2 = group.controls[password2].value

      if(pass1 == pass2){
        return null
      }

      return{
        invalidPasswordSame: true
      }

    }
  }

  acceptTerms(){

    return (group: FormGroup) => {
      if(group.value.terms){
        return null
      }

      return{
        acceptTerms: true
      }

    }

  }

  ngOnInit(): void {
    init_plugins()

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      terms: new FormControl(false)
    }, {
      validators: [this.passwordSame('password','confirmPassword'), this.acceptTerms()]
    })

    this.form.setValue({
      name: 'franco',
      email: 'streeghzalt@gmail.com',
      password: 'Francocjs12',
      confirmPassword: 'Francocjs12',
      terms: false
    })

  }

  registerUser(){

    this.form.markAllAsTouched()
    
    if(this.form.valid){
      const user = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password
      )
      console.log(this.form)

      this.userService.registerUser(user).subscribe(data => this.router.navigate(['/login']))
      
    }

    return

  }

}
