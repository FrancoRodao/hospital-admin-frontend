import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './main/pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctor/doctor.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: {title: "Dashboard"} },
            { path: 'profile', component: ProfileComponent, data: {title: "Profile"}},
            { path: 'progress', component: ProgressComponent, data: {title: "Progress"} },
            { path: 'graficas', component: Graficas1Component, data: {title: "Graphics"} },
            { path: 'promesas', component: PromesasComponent, data: {title: "Promises"} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: "Settings"}},
            { path: 'rxjs', component: RxjsComponent, data: {title: "RxJs"}},

            //MANTENIMIENTO
            { path: 'users', component: UsersComponent, data: {title: "Users"} },
            { path: 'hospitals', component: HospitalsComponent, data: {title: "Hospitals"} },
            { path: 'doctors', component: DoctorComponent, data: {title: "Doctors"}}
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRouting {}
