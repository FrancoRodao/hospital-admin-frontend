import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { UploadService } from 'src/app/services/uploads/upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { environment } from 'src/environments/environment';
import { Doctor } from 'src/app/models/doctor.model';
import { HospitalService } from 'src/app/services/mantenaice/hospital/hospital.service';
import { UserService } from 'src/app/services/mantenaice/user/user.service';
import { DoctorService } from 'src/app/services/mantenaice/doctor/doctor.service';

const URL_DEFAULTIMAGE = environment.URL_DEFAULTIMAGE

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  @Input('type') type: 'hospital' | 'doctor'
  @Output('close') closeDialog = new EventEmitter<boolean>();
  @Output('created') created = new EventEmitter<Hospital | Doctor>();

  fileToUpload: File = null;
  imageTemp: string | ArrayBuffer = URL_DEFAULTIMAGE
  token: string
  selected: Hospital | Doctor
  loading: boolean = false
  hospitals: Hospital[] = []


  selectedOption: string = 'Choose a Hospital';


  constructor(
    private hospitalService: HospitalService,
    private userService: UserService,
    private snackBar: SnackbarService,
    private uploadService: UploadService,
    private doctorService: DoctorService
  ) { }


  ngOnInit(): void {
    this.token = this.userService.getToken()
    
    if(this.type == 'doctor'){
      this.hospitalService.getAllHospitals().subscribe((res: any)=>{
        this.hospitals = res.hospitals
      })
    }

  }

  create(info: any) {
    this.loading = true
    switch (this.type) {
      case 'hospital':
        if(info == ''){
          this.snackBar.snackBarError('the name is required','',5000)
          this.loading = false
          return
        }
        const hospital: Hospital = {
          name: info
        }
        this.hospitalService.createHospital(hospital).subscribe((res: any) => {
          if (this.fileToUpload) {
            this.selected = res.hospital
            this.uploadPhoto()
            return
          }
          this.loading = false
          this.close(true,res.hospital)
        })

        break;

      case 'doctor':

        if(info == ''){
          this.snackBar.snackBarError('the name is required','',5000)
          this.loading = false
          return
        }

        const resultado = this.hospitals.find( hospital => hospital.name == this.selectedOption );
        if(resultado){
          const doctor: Doctor = {
            name: info,
            hospital: resultado
          }
          this.doctorService.createDoctor(doctor).subscribe((res: any) => {
            if (this.fileToUpload) {
              this.selected = res.doctor
              this.uploadPhoto()
              return
            }
            this.loading = false
            this.close(true,res.doctor)
          })
        }else{
          this.snackBar.snackBarError('You must assign a hospital to the doctor','',5000)
          this.loading = false
          return
        }
        break;

      default:
        this.snackBar.snackBarError('Unexpected error','',5000)
        this.loading = false        
        break;
    }


  }

  uploadPhoto() {
    switch (this.type) {
      case 'hospital':
        this.uploadService.uploadImage(this.type, this.selected._id, this.fileToUpload).subscribe((imagePath: string) => {
          this.selected.img = imagePath
          this.snackBar.snackBar('¡Hospital image updated!', '', 3000)
          this.loading = false
          this.close(true,this.selected)
        })
        break;

      case 'doctor':
        this.uploadService.uploadImage(this.type, this.selected._id, this.fileToUpload).subscribe((imagePath: string) => {
          this.selected.img = imagePath
          this.snackBar.snackBar('¡Doctor image updated!', '', 3000)
          this.loading = false
          this.close(true, this.selected)
        })
        break;
      default:
        throw new Error('ERROR IN THE MODAL SWITCH');
    }

  }

  handleFileInput(files: FileList) {
    const validExtensions = ['image/jpg', 'image/png', 'image/svg', 'image/gif', 'image/jpeg']
    this.fileToUpload = files.item(0);
    if (validExtensions.indexOf(this.fileToUpload.type) == -1) {
      this.snackBar.snackBarError("This file isn't a image", '', 5000)
      const fileInput = document.getElementById("file2") as HTMLInputElement
      fileInput.value = ''
      this.fileToUpload = null
      this.imageTemp = ''
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(this.fileToUpload)
    reader.onloadend = () => this.imageTemp = reader.result
  }

  close(created: boolean, objCreated?: Hospital | Doctor) {
    if (created) {
      this.created.emit(objCreated)
    }
    this.closeDialog.emit(false)
  }

}
