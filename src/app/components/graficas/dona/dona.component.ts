import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() label: Label[]
  @Input() data: MultiDataSet
  @Input() type: ChartType
  @Input() legend: string


  constructor() { }

  ngOnInit(): void {
  }
  
  public chartColors: any[] = [
    { 
      backgroundColor:["#FF7360", "#6FC8CE", "blue", "#FFFCC4", "#B9E8E0"] 
    }];

}
