//MODULES
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



//COMPONENTS
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';

//pipes
import { PipesModule } from '../pipes/pipes.module';
import { SureRemoveComponent } from './dialogs/sure-remove/sure-remove.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        SureRemoveComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        SureRemoveComponent
    ]
})

export class SharedModule {}