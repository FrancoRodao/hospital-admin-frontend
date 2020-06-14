import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.countThree().then(mensaje => console.log(mensaje))
                     .catch(error => console.log(error))
    

  }

  ngOnInit(): void {
  }

  countThree(){
    return new Promise((resolve,reject)=>{
      let contador  = 0

      const interval = setInterval(()=>{

        contador += 1
        console.log(contador)
        if(contador == 3) {
          resolve("TODO OK !")
          clearInterval(interval)
        }

      },1000)

    })

    }
  }


