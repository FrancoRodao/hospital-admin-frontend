import { Injectable } from '@angular/core';
import { UserService } from '../mantenaice/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = []

  constructor(
    private userService: UserService
  ) { }

  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || []

    if(this.menu.length <= 0){
      this.userService.logout()
    }
  }

}
