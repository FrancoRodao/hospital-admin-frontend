//MODULOS
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from "@angular/common";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SharedModule } from '../shared/shared.module';

//COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './main/pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//guards
import { LoginGuard } from '../guards/login.guard';

//pipes
import { PipesModule } from '../pipes/pipes.module';

//routing
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { Graficas1Component } from './graficas1/graficas1.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctor/doctor.component';




@NgModule({
    declarations: [
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DashboardComponent,
        DoctorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        AccountSettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ChartsModule,
        PipesModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        RouterModule,
        ComponentsModule
    ],
})

export class PageModule {}