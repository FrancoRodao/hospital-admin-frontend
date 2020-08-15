import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { UploadService } from 'src/app/services/uploads/upload.service';
import { UserService } from 'src/app/services/mantenaice/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: User
  form: FormGroup
  googleUser: boolean = false
  fileToUpload: File = null;
  imageTemp: string | ArrayBuffer
  token: string

  constructor(
    private userService: UserService,
    private snackBar: SnackbarService,
    private uploadService: UploadService
  ) {

    

   }

  ngOnInit(): void {

    this.user = this.userService.user
    this.token = this.userService.getToken()
    if(this.user.google){
      this.googleUser = this.user.google
    }

    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl({value: this.user.email, disabled: this.googleUser}, [Validators.required, Validators.email]),
      password: new FormControl({value: '', disabled: this.googleUser}, [Validators.required]),
      confirmPassword: new FormControl({value:'', disabled: this.googleUser}, [Validators.required]),
      role: new FormControl({value: this.user.role, disabled: true})
    }, {
      validators: this.passwordSame('password','confirmPassword')
    })


  }

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

  editProfile(){
    if(this.form.valid){
      const editUser = {
        ...this.form.value,
        role: this.userService.user.role,
        _id: this.userService.user._id
      }
      this.userService.editUser(editUser).subscribe(
        () => {
          this.snackBar.snackBar('Profile updated!','',5000)
        },
      )
    }
    return
  }

  handleFileInput(files: FileList) {
    const validExtensions = ['image/jpg','image/png','image/svg','image/gif','image/jpeg']
    this.fileToUpload = files.item(0);
    if(validExtensions.indexOf(this.fileToUpload.type) == -1){
      this.snackBar.snackBarError("This file isn't a image",'',5000)
      const fileInput = document.getElementById("file2") as HTMLInputElement
      fileInput.value = ''
      this.fileToUpload = null
      this.imageTemp = ''
      return
    }

    const reader= new FileReader()
    reader.readAsDataURL(this.fileToUpload)
    reader.onloadend = ()=> this.imageTemp = reader.result
  }

  uploadPhoto(){
    this.uploadService.uploadImage('user',this.user._id,this.fileToUpload).subscribe((imagePath: string)=> {
      this.user.img = imagePath
      this.userService.saveUser(localStorage.getItem('token'),this.user)
      this.userService.loadUserInfo()
      this.snackBar.snackBar('¡Image profile updated!','',3000)
    },(err)=>{
      this.snackBar.snackBarError('Image upload error, please try again later','',5000)
    })

  }

}
