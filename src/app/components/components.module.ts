import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonaComponent } from './graficas/dona/dona.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { CreateComponent } from './dialogs/create/create.component';
import { LoadingComponent } from './loading/loading.component';
import { IncrementorComponent } from './incrementor/incrementor.component';



@NgModule({
  declarations: [    
    ProgressComponent,
    Graficas1Component,
    DonaComponent,
    ModalUploadComponent,
    CreateComponent,
    LoadingComponent,
    IncrementorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    ProgressComponent,
    Graficas1Component,
    DonaComponent,
    ModalUploadComponent,
    CreateComponent,
    LoadingComponent,
    IncrementorComponent
  ]
})
export class ComponentsModule { }
