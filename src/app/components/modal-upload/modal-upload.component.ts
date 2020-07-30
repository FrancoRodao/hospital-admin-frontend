import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { Hospital } from 'src/app/models/hospital.model';
import { UploadService } from 'src/app/services/uploads/upload.service';
import { Doctor } from 'src/app/models/doctor.model';
import { UserService } from 'src/app/services/mantenaice/user/user.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  @Input('selected') selected: User & Hospital & Doctor
  @Input('type') type: string
  @Output('close') propagar = new EventEmitter<boolean>();

  fileToUpload: File = null;
  imageTemp: string | ArrayBuffer
  token: string

  constructor(
    private userService: UserService,
    private snackBar: SnackbarService,
    private uploadService: UploadService,
  ) {
  }

  ngOnInit(): void {
    this.token = this.userService.getToken()

  }

  close() {
    this.propagar.emit(false)
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

  uploadPhoto() {
    switch (this.type) {
      case 'user':
        this.uploadService.uploadImage(this.type, this.selected._id, this.fileToUpload).subscribe((imagePath: string) => {
          this.selected.img = imagePath
          if (this.selected._id == this.userService.user._id) {
            this.userService.saveUser(this.userService.getToken(), this.selected)
          }
          this.snackBar.snackBar('¡Image profile updated!', '', 3000)
          this.close()
        })
        break;
      case 'hospital':
        this.uploadService.uploadImage(this.type, this.selected._id, this.fileToUpload).subscribe((imagePath: string) => {
          this.selected.img = imagePath
          this.snackBar.snackBar('¡Hospital image updated!', '', 3000)
          this.close()
        })
        break;
      case 'doctor':
        this.uploadService.uploadImage(this.type, this.selected._id, this.fileToUpload).subscribe((imagePath: string) => {
          this.selected.img = imagePath
          this.snackBar.snackBar('¡Doctor image updated!', '', 3000)
          this.close()
        })
        break;
      default:
        throw new Error('ERROR IN THE MODAL SWITCH');
    }

  }


}
