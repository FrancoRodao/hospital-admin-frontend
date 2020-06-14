import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './main/pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: "Dashboard"} },
            { path: 'progress', component: ProgressComponent, data: {title: "Progress"} },
            { path: 'graficas', component: Graficas1Component, data: {title: "Graphics"} },
            { path: 'promesas', component: PromesasComponent, data: {title: "Promises"} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: "Settings"}},
            { path: 'rxjs', component: RxjsComponent, data: {title: "RxJs"}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)