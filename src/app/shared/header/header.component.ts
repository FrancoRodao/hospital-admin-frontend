import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/mantenaice/user/user.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user: User

  constructor(
    public userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  globalSearch(term: string){
    this.router.navigateByUrl(`/search/${term}`)
  }



}
