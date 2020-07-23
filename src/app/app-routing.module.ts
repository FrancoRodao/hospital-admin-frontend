import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouting } from './login/auth.routing';
import { PagesRouting } from './pages/pages.routes';
import { NotfoundComponent } from './pages/notfound/notfound.component';


const routes: Routes = [

  //path : '/dashboard' PagesRouting
  //path : '/auth' AuthRouting


  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRouting,
    PagesRouting
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
