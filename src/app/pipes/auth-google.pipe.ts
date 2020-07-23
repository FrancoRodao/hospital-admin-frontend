import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authGoogle'
})
export class AuthGooglePipe implements PipeTransform {

  transform(value: boolean): string {
    if(value){
      return 'Google'
    }
    return 'Auth'
  }

}
