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
import { DonaComponent } from '../components/graficas/dona/dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { CreateComponent } from '../components/dialogs/create/create.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { IncrementorComponent } from '../components/incrementor/incrementor.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//guards
import { LoginGuard } from '../guards/login.guard';

//pipes
import { PipesModule } from '../pipes/pipes.module';

//routing
import { PagesRouting } from './pages.routes';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { Graficas1Component } from './graficas1/graficas1.component';




@NgModule({
    declarations: [
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DashboardComponent
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