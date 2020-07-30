import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllHospitals(page: number = 1){
    const url = environment.URL_SERVICES+`/hospitals?page=${page}`
    return this.http.get(url)
  }

  // getHospital(id: string){
  //   const url = environment.URL_SERVICES+`/hospitals/${id}`
  //   return this.http.get(url)
  // }

  createHospital(hospital: Hospital){
    const url = environment.URL_SERVICES+`/hospitals`
    return this.http.post(url,hospital)
  }

  deleteHospital(id: string){
    const url = environment.URL_SERVICES+`/hospitals/${id}`
    return this.http.delete(url)
  }

  editHospital(hospital: Hospital){
    const url = environment.URL_SERVICES+`/hospitals`
    return this.http.put(url,hospital)
  }

  searchHospitals(term: string, page: number){
    const url = environment.URL_SERVICES+`/search/hospitals/${term}?page=${page}`
    return this.http.get(url).pipe(map((res: any)=>{
      return {
        ok: res.ok,
        message: res.message,
        lastSearch: url
      }
    }))
  }

}
