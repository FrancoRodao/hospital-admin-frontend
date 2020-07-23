import { Component, OnInit, ElementRef } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { SureRemoveComponent } from 'src/app/shared/dialogs/sure-remove/sure-remove.component';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  loading: boolean = false

  hospitals: Hospital[] = []
  isNext: boolean = false
  isPrev: boolean = false

  totalPages: number = 1
  totalResults: number = 0

  lastHospitals: string //COMPRUEBA SI LA BUSQUEDA ES DE GET ALL O SEARCH
  lastTerm: string = ''
  lastPage: number = 1

  showAlerts: boolean = true

  selectedHospital: Hospital
  changeImageModal: boolean = false
  createHospitalDialog: boolean = false

  constructor(
    private hospitalService: HospitalService,
    private dialog: MatDialog,
    private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getAllHospitals()

  }

  searchHospitals(term: string, loading: boolean = true, page: number = 1) {
    if (term.length > 0) {
      if (loading) {
        this.loading = true
      }

      if (page == 1) {
        this.isPrev = false
      }
      this.hospitalService.searchHospitals(term, page).subscribe((res: any) => {
        this.hospitals = res.search.hospitals
        this.totalPages = res.search.totalPages
        this.lastTerm = term
        this.lastPage = page
        this.totalResults = res.search.total
        this.lastHospitals = ''
        if (this.lastPage < this.totalPages) {
          this.isNext = true
        } else {
          this.isNext = false
        }

        this.loading = false
      })
    } else {
      this.getAllHospitals(page)
    }
    return

  }

  getAllHospitals(page: number = 1, verifyNext: boolean = false) {

    this.loading = true

    if (page == 1) {
      this.isPrev = false
    } else {
      this.isPrev = true
    }
    this.hospitalService.getAllHospitals(page).subscribe((res: any) => {
      this.hospitals = res.hospitals
      this.totalPages = res.totalPages
      this.totalResults = res.total
      this.lastHospitals = 'getAll'
      this.lastPage = page
      if (this.lastPage < this.totalPages) {
        this.isNext = true
      } else {
        this.isNext = false
      }
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

  nextPage() {
    if (!this.isNext) {
      return
    }

    if (this.lastHospitals == 'getAll') {
      this.getAllHospitals(this.lastPage + 1)
    } else {
      this.searchHospitals(this.lastTerm, true, this.lastPage + 1)
    }
    this.isPrev = true

  }

  prevPage() {
    if (!this.prevPage) {
      return
    }

    if (this.lastHospitals == 'getAll') {
      this.getAllHospitals(this.lastPage - 1)
    } else {
      this.searchHospitals(this.lastTerm, true, this.lastPage - 1)
    }

  }

  deleteHospital(position: number) {

    const id = this.hospitals[position]._id
    const name = this.hospitals[position].name

    if (this.showAlerts) {
      const dialogRef = this.dialog.open(SureRemoveComponent);
      dialogRef.componentInstance.Hospital = this.hospitals[position]
      dialogRef.afterClosed().subscribe(
        (result) => {
          if (result == true) {
            this.deleteHospitalService(id,name,position)
          }
        })
    }else{
      this.deleteHospitalService(id,name,position)
    }

  }

  deleteHospitalService(id: string,name: string,position: number,){
    this.loading = true
    this.hospitalService.deleteHospital(id).subscribe((message: string) => {
      this.hospitals.splice(position, 1)
      if (this.hospitals.length <= 0 && this.totalPages != 1) {
          this.prevPage()
      }else {
        this.searchHospitals(this.lastTerm, false, this.lastPage)
      }
      this.snackBar.snackBarError(`¡${name} deleted successfully!`, '', 5000)
      this.loading = false
    })
  }

  closeModal(event: boolean, modal: string) {
    switch (modal) {
      case 'createDialog':
        this.createHospitalDialog = event
        break;
      case 'changeImage':
        this.changeImageModal = event
        break;
    }

  }

  createHospital() {
    this.createHospitalDialog = true
  }

  changeName(index: number) {
    const name = (document.getElementById(this.hospitals[index]._id) as HTMLInputElement).value;
    if(name.length <= 0){
      this.snackBar.snackBarError('Name is required','',5000)
      return
    }
    const hospital = this.hospitals[index]
    hospital.name = name
    this.hospitalService.editHospital(hospital).subscribe(
      () => {
        
      },
      (err) => {
        this.snackBar.snackBarError(err.error.message,'',5000)
        return
      }
    )
    this.snackBar.snackBar('Hospital updated','',5000)
  }

  changeImage(position: number) {
    const hospital = this.hospitals[position]
    this.selectedHospital = hospital
    this.changeImageModal = true
  }

  goToNewHospital() {
    this.getAllHospitals(this.totalPages, true)
  }

}
