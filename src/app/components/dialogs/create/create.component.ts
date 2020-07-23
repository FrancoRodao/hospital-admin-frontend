import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { UploadService } from 'src/app/services/uploads/upload.service';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';

const URL_DEFAULTIMAGE = environment.URL_DEFAULTIMAGE

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  
  @Input('type') type: string
  @Output('close') closeDialog = new EventEmitter<boolean>();
  @Output('created') created = new EventEmitter();

  fileToUpload: File = null;
  imageTemp: string | ArrayBuffer = URL_DEFAULTIMAGE
  token: string
  selected: User & Hospital
  loading: boolean = false

  constructor(
    private hospitalService: HospitalService,
    private userService: UserService,
    private snackBar: SnackbarService,
    private uploadService: UploadService
  ) { }


  ngOnInit(): void {
    this.token = this.userService.getToken()
  }

  create(info: any){
    this.loading = true
    switch (this.type) {
      case 'hospital':
        const hospital: Hospital = {
          name: info
        }
        this.hospitalService.createHospital(hospital).subscribe((res: any)=>{
          if(this.fileToUpload){
            this.selected = res.hospital
            this.uploadPhoto()
            return
          }
          this.loading = false
          this.close(true)
        })
        
        break;
    
      default:
        break;
    }
    
    
  }

  uploadPhoto(){
    switch (this.type) {
      case 'hospital':
        this.uploadService.uploadImage(this.type,this.selected._id,this.fileToUpload).subscribe((imagePath: string)=> {
          this.selected.img = imagePath
          this.snackBar.snackBar('¡Hospital image updated!','',3000)
          this.loading = false
          this.close(true)
        })
        break;
      default:
        throw new Error('ERROR IN THE MODAL SWITCH');
    }

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

  close(created: boolean){
    if(created){
      this.created.emit()
    }
    this.closeDialog.emit(false)
  }

}
