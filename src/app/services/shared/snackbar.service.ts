import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private _snackBar: MatSnackBar
  ) { }

  snackBar(text: string, textClose: string, duration: number,horizontalPosition: MatSnackBarHorizontalPosition = 'center',verticalPosition: MatSnackBarVerticalPosition = 'top'){
    this._snackBar.open(text, textClose, {
      duration: duration,
      horizontalPosition,
      verticalPosition,
      panelClass: 'blue-snackbar'
    });
    
  }

  snackBarError(text: string, textClose: string, duration: number,horizontalPosition: MatSnackBarHorizontalPosition = 'center',verticalPosition: MatSnackBarVerticalPosition = 'top'){
    this._snackBar.open(text, textClose, {
      duration: duration,
      horizontalPosition,
      verticalPosition,
      panelClass: 'red-snackbar'
    });
  }
}
