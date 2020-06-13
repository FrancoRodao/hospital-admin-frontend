//MODULOS
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

//COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
//temporal
import { IncrementorComponent } from '../components/incrementor/incrementor.component';
import { DonaComponent } from '../components/graficas/dona/dona.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        DonaComponent,
        IncrementorComponent//temporal
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        DonaComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        PAGES_ROUTES,
        ChartsModule
    ]
})

export class PageModule {}