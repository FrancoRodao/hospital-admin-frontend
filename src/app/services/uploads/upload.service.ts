import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(type: string, id: string, image: File){
    const url =  environment.URL_SERVICES+`/image/${id}/${type}`
    const formData = new FormData();
    formData.append('image', image)
    return this.http.post(url,formData)
    .pipe(map((res: any)=>{
      return res.message
    }))
  }

}
