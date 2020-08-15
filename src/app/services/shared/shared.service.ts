import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }

  globalSearch(term: string){
    const url = environment.URL_SERVICES+`/search/all/${term}`

    return this.http.get(url)

  }
}
