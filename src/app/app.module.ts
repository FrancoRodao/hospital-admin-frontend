//MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PageModule } from "./pages/pages.module";

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/signin/login.component';
import { RegisterComponent } from './login/signup/register.component';
import { FormsModule } from '@angular/forms';

//SERVICIOS
import { ServiceModule } from "./services/service.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PageModule,
    AppRoutingModule,
    ServiceModule,
    FormsModule //temporal
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
