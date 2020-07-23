import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/shared/snackbar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { SureRemoveComponent } from 'src/app/shared/dialogs/sure-remove/sure-remove.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
    '.button-yellow { background: #28a745; color: #fff; };',
    '.button-blue{ background: #17a2b8; color: #fff; };'
  ]
})
export class UsersComponent implements OnInit {

  loading: boolean = false

  users: User[] = []
  isNext: boolean = false
  isPrev: boolean = false

  totalPages: number = 1
  totalResults: number = 0

  lastUsers: string //COMPRUEBA SI LA BUSQUEDA ES DE GET ALL O SEARCH
  lastTerm: string = ''
  lastPage: number = 1

  showAlerts: boolean = true

  selectedUser: User
  changeImageModal: boolean = false

  constructor(
    private userService: UserService,
    private snackBar: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  searchUsers(term: string, loading: boolean = true, page: number = 1){
    if(term.length > 0){
      if(loading){
        this.loading = true
      }

      if(page == 1){
        this.isPrev = false
      }
      this.userService.searchUsers(term,page).subscribe((res: any)=>{
        this.users = res.search.users
        this.totalPages = res.search.totalPages
        this.lastTerm = term
        this.lastPage = page
        this.totalResults = res.search.total
        this.lastUsers = ''
        if(this.lastPage < this.totalPages){
          this.isNext = true
        }else{
          this.isNext = false
        }
        this.loading = false
      })
    }else{
      this.getAllUsers(page)
    }

    return

  }

  nextPage(){
    if(!this.isNext){
      return
    }

    if(this.lastUsers == 'getAll'){
      this.getAllUsers(this.lastPage+1)
    }else{
      this.searchUsers(this.lastTerm, true, this.lastPage+1)
    }
    this.isPrev = true
    
  }

  prevPage(){
    if(!this.prevPage){
      return
    }

    if(this.lastUsers == 'getAll'){
      this.getAllUsers(this.lastPage-1)
    }else{
      this.searchUsers(this.lastTerm, true, this.lastPage-1)
    }

  }

  deleteUser(position: number){
    const id = this.users[position]._id

    if(id == this.userService.user._id){
      this.snackBar.snackBarError("You can't erase yourself",'',5000)
      return;
    }

    const name = this.users[position].name

    if(this.showAlerts){
      const dialogRef = this.dialog.open(SureRemoveComponent);
      dialogRef.componentInstance.User = this.users[position]
      dialogRef.afterClosed().subscribe(
        (result) => {
          if (result == true) {
            this.loading = true
            this.userService.deleteUser(id).subscribe((message: string) => {
              this.users.splice(position,1)
              if(this.users.length <= 0){
                this.prevPage()
              }else{
                this.searchUsers(this.lastTerm, false, this.lastPage)
              }
              this.snackBar.snackBarError(`¡${name} deleted successfully!`,'',5000)
              this.loading = false
            })
          }
        })
    }else{
      this.loading = true
      this.userService.deleteUser(id).subscribe((message: string) => {
        this.users.splice(position,1)
        if(this.users.length <= 0){
          this.prevPage()
        }else{
          this.searchUsers(this.lastTerm, false, this.lastPage)
        }
        this.snackBar.snackBarError(`¡${name} deleted successfully!`,'',5000)
        this.loading = false
      })
    }

    //OPTIMIZAR LO DUPLICADO EN EL IF ELSE
  }


  getAllUsers(page: number = 1){

    this.loading = true

    if(page == 1){
      this.isPrev = false
    }

    this.userService.getAllUsers(page).subscribe((res: any)=>{
      this.users = res.users
      this.totalPages = res.totalPages
      this.totalResults = res.total
      this.lastUsers = 'getAll'
      this.lastPage = res.inPage
      if(this.lastPage < this.totalPages){
        this.isNext = true
      }else{
        this.isNext = false
      }
      this.loading = false
    })
  }

  slideChange(event: MatSlideToggleChange){
    if(event.checked){
      this.showAlerts = true
    }else{
      this.showAlerts = false
    }
  }

  roleChange(role: string, index: number){
    const selectedUserId = this.users[index]._id
    switch (role) {
      case 'ADMIN_ROLE':
        
        this.userService.changeRole(selectedUserId,role).subscribe()

        break;
    
      case 'USER_ROLE':

        this.userService.changeRole(selectedUserId,role).subscribe()

        break;
    }
  }

  changeImage(position: number){
    const user = this.users[position]
    this.selectedUser = user
    this.changeImageModal = true
  }

  closeModal(event: boolean){
    this.changeImageModal = event
    
    if(this.lastUsers == 'getAll'){
      this.getAllUsers(this.lastPage)
    }else{
      this.searchUsers(this.lastTerm,true,this.lastPage)
    }

  }


}
