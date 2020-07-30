import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SureRemoveComponent } from 'src/app/shared/dialogs/sure-remove/sure-remove.component';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DoctorService } from 'src/app/services/mantenaice/doctor/doctor.service';
import { HospitalService } from 'src/app/services/mantenaice/hospital/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  loading: boolean = false

  doctors: Doctor[] = []
  isNext: boolean = false
  isPrev: boolean = false

  totalPages: number = 1
  totalResults: number = 0

  lastDoctors: string //COMPRUEBA SI LA BUSQUEDA ES DE GET ALL O SEARCH
  lastTerm: string = ''
  lastPage: number = 1

  showAlerts: boolean = true

  selectedDoctor: Doctor
  changeImageModal: boolean = false
  createDoctorDialog: boolean = false

  hospitals: Hospital[] = []

  selectedOption: Hospital

  formDoctors: FormGroup


  constructor(
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.formDoctors = this.formBuilder.group({
      doctorsForms: this.formBuilder.array([])
    })

    this.getAllDoctors()


  }


  editDoctor(position: number) {
    this.loading = true
    const doctorEdit: Doctor = this.formDoctors.controls['doctorsForms'].value[position];
    const selectedDoctor: Doctor = this.doctors[position]
    selectedDoctor.hospital = doctorEdit.hospital
    selectedDoctor.name = doctorEdit.name
    this.doctorService.editDoctor(selectedDoctor).subscribe(()=> {
      this.snackBar.snackBar('Doctor updated!','',5000)
      this.loading = false
    })
  }

  addDoctorForm(doctor: Doctor) {
    // This function instantiates a FormGroup for each day
    // and pushes it to our FormArray

    // We get our FormArray
    const control = <FormArray>this.formDoctors.controls['doctorsForms'];

    // instantiate a new day FormGroup;
    const newDoctorGroup: FormGroup = this.formBuilder.group({
      name: [doctor.name, Validators.required],
      hospital: [doctor.hospital, Validators.required],
    });;

    // Add it to our formArray
    control.push(newDoctorGroup);
  }

  searchDoctors(term: string, loading: boolean = true, page: number = 1) {
    if (term.length > 0) {
      if (loading) {
        this.loading = true
      }

      if (page == 1) {
        this.isPrev = false
      }
      this.doctorService.searchDoctors(term, page).subscribe((res: any) => {
        this.doctors = res.message.doctors
        this.totalPages = res.message.totalPages
        this.lastTerm = term
        this.lastPage = page
        this.totalResults = res.message.total
        this.lastDoctors = ''

        const clearFormArray = (formArray: FormArray) => {
          while (formArray.length !== 0) {
            formArray.removeAt(0)
          }
        }
        const control = <FormArray>this.formDoctors.controls['doctorsForms'];
        clearFormArray(control)
        for (let index = 0; index < this.doctors.length; index++) {
          const element = this.doctors[index];
          this.addDoctorForm(element)
        }

        if (this.lastPage < this.totalPages) {
          this.isNext = true
        } else {
          this.isNext = false
        }
        this.loading = false
      })
    } else {
      this.getAllDoctors(page)
    }

    return

  }

  nextPage() {
    if (!this.isNext) {
      return
    }

    if (this.lastDoctors == 'getAll') {
      this.getAllDoctors(this.lastPage + 1)
    } else {
      this.searchDoctors(this.lastTerm, true, this.lastPage + 1)
    }
    this.isPrev = true

  }

  prevPage() {
    if (!this.prevPage) {
      return
    }

    if (this.lastDoctors == 'getAll') {
      this.getAllDoctors(this.lastPage - 1)
    } else {
      this.searchDoctors(this.lastTerm, true, this.lastPage - 1)
    }

  }

  deleteDoctor(position: number) {
    const id = this.doctors[position]._id

    const name = this.doctors[position].name

    if (this.showAlerts) {
      const dialogRef = this.dialog.open(SureRemoveComponent);
      dialogRef.componentInstance.Doctor = this.doctors[position]
      dialogRef.afterClosed().subscribe(
        (result) => {
          if (result == true) {
            this.loading = true
            this.doctorService.deleteDoctor(id).subscribe((message: string) => {
              this.doctors.splice(position, 1)
              const control = <FormArray>this.formDoctors.controls['doctorsForms'];
              control.removeAt(position)
              if (this.doctors.length <= 0) {
                this.prevPage()
              } else {
                this.searchDoctors(this.lastTerm, false, this.lastPage)
              }
              this.snackBar.snackBarError(`¡${name} deleted successfully!`, '', 5000)
              this.loading = false
            })
          }
        })
    } else {
      this.loading = true
      this.doctorService.deleteDoctor(id).subscribe((message: string) => {
        this.doctors.splice(position, 1)
        if (this.doctors.length <= 0) {
          this.prevPage()
        } else {
          this.searchDoctors(this.lastTerm, false, this.lastPage)
        }
        this.snackBar.snackBarError(`¡${name} deleted successfully!`, '', 5000)
        this.loading = false
      })
    }

    //OPTIMIZAR LO DUPLICADO EN EL IF ELSE
  }


  getAllDoctors(page: number = 1, verifyNext: boolean = false) {

    this.loading = true

    if (page == 1) {
      this.isPrev = false
    }

    this.doctorService.getAllDoctors(page).subscribe((res: any) => {
      this.doctors = res.doctors
      this.totalPages = res.totalPages
      this.totalResults = res.total
      this.lastDoctors = 'getAll'
      this.lastPage = res.inPage

      const clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
          formArray.removeAt(0)
        }
      }
      const control = <FormArray>this.formDoctors.controls['doctorsForms'];
      clearFormArray(control)

      for (let index = 0; index < this.doctors.length; index++) {
        const element = this.doctors[index];
        this.addDoctorForm(element)
      }

      if (this.lastPage < this.totalPages) {
        this.isNext = true
      } else {
        this.isNext = false
      }
      this.hospitalService.getAllHospitals().subscribe((res: any) => {
        this.hospitals = res.hospitals
      })

      if (verifyNext) {
        if (this.isNext) {
          this.nextPage()
        }
      }

      this.loading = false
    })


  }

  slideChange(event: MatSlideToggleChange) {
    if (event.checked) {
      this.showAlerts = true
    } else {
      this.showAlerts = false
    }
  }


  changeImage(position: number) {
    const Doctor = this.doctors[position]
    this.selectedDoctor = Doctor
    this.changeImageModal = true
  }

  closeModal(event: boolean, modal: string) {
    switch (modal) {
      case 'createDialog':

        this.createDoctorDialog = event
        break;
      case 'changeImage':
        this.changeImageModal = event
        break;
    }

  }

  createDoctor() {
    this.createDoctorDialog = true
  }

  goToNewDoctor(doctor: Doctor) {
    this.addDoctorForm(doctor)
    this.getAllDoctors(this.totalPages, true)
  }


}
