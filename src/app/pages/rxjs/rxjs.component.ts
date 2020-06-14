import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter } from "rxjs/operators";
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  subscription: Subscription

  constructor() {


    this.subscription = this.returnObservable().subscribe(
      numero => console.log(numero),
      err => console.error("error en el observable", err),
      () => console.log("el observador termino")
    )

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  returnObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {
      let contador = 0

      let interval = setInterval(() => {
        contador++

        const salida = {
          value: contador
        }

        observer.next(salida)

        // if(contador == 2){
        //   // clearInterval(interval)
        //   observer.error("EL CONTADOR ES 2")
        // }
      }, 1000)

    }).pipe(map(data => data.value),
      filter((value) => {
        if (value % 2 == 1) {
          return true
        } else {
          return false
        }

      }))

  }
}
