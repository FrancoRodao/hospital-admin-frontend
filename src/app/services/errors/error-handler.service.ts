import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { SnackbarService } from '../shared/snackbar.service';
import { UserService } from '../mantenaice/user/user.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private snackBar: SnackbarService,
    private userService: UserService
  ) { }

  //EXEPTION
  handleError(error) {
    //INVALID TOKEN/SESSION
    if (error.status === 401) {
      this.userService.logout()
      this.snackBar.snackBarError('Invalid session, please login again', '', 8000)
      return
    }

    if (error.error.ok == "false") {
      this.snackBar.snackBarError(error.error.message, '', 8000)
      return
    } else {
      this.snackBar.snackBarError('Unexpected error, please contact the developers', '', 8000)
    }

  }


}
