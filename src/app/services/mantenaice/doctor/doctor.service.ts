import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllDoctors(page: number = 1){
    const url = environment.URL_SERVICES+`/doctors?page=${page}`
    return this.http.get(url)
  }

  // getDoctor(id: string){
  //   const url = environment.URL_SERVICES+`/doctors/${id}`
  //   return this.http.get(url)
  // }

  createDoctor(doctor: Doctor){
    const url = environment.URL_SERVICES+`/doctors`
    return this.http.post(url,doctor)
  }

  deleteDoctor(id: string){
    const url = environment.URL_SERVICES+`/doctors/${id}`
    return this.http.delete(url)
  }

  editDoctor(doctor: Doctor){
    const url = environment.URL_SERVICES+`/doctors/${doctor._id}`
    return this.http.put(url,doctor)
  }

  searchDoctors(term: string, page: number){
    const url = environment.URL_SERVICES+`/search/doctors/${term}?page=${page}`
    return this.http.get(url).pipe(map((res: any)=>{
      return {
        ok: res.ok,
        message: res.message,
        lastSearch: url
      }
    }))
  }

}
