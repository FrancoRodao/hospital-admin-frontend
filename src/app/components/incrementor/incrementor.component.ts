import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
})
export class IncrementorComponent implements OnInit {

  @ViewChild('txtprogress') txtprogress: ElementRef

  @Input('name') legend: string = "Leyenda"
  @Input() progress: number = 50

  @Output() onChangeValue: EventEmitter<number> = new EventEmitter()

  constructor() {

    console.log("leyenda",this.legend)
    console.log("progress",this.progress)


   }

  ngOnInit(): void {
  }

  
  changeValue(value: number){
    if(this.progress >= 100 && value >= 0) {
      return
    }
    if(this.progress <= 0 && value <= 0){
      return
    }
    this.progress += value
    this.onChangeValue.emit(this.progress)
  }

  onChanges(numero: number){
    if(numero >= 100){
      this.progress = 100
    }else if(numero <= 0 || null){
      this.progress = 0
    }else{
      this.progress = numero
    }
    this.txtprogress.nativeElement.value = this.progress
    this.onChangeValue.emit(this.progress)
    this.txtprogress.nativeElement.focus()

  }

}
