import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type?: string): string {
    if(image.includes('https://lh3.googleusercontent.com/a-/')){
      return image
    }

    if(!image){
      return environment.URL_DEFAULTIMAGE
    }

    switch (type) {
      case 'user':
        return environment.URL+`/${image}`

      case 'doctor':
        return environment.URL+`/${image}`

      case 'hospital':
        return environment.URL+`/${image}`

      default:
        return environment.URL_DEFAULTIMAGE
    }

  }

}
