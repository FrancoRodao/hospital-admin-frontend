import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: User[] = []
  doctors: Doctor[] = []
  hospitals: Hospital[] = []

  constructor(
    private activatedRouter: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(({term})=> {
      if(term.lenght <= 0){
        return
      }
      this.sharedService.globalSearch(term).subscribe((res: any)=> {
        this.users = res.users
        this.doctors = res.doctors
        this.hospitals = res.hospitals
      })
    })

  }

}
