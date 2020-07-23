import { NgModule } from '@angular/core';
import { ImagePipe } from "./image.pipe";
import { AuthGooglePipe } from './auth-google.pipe';


@NgModule({
  declarations: [
    ImagePipe,
    AuthGooglePipe
  ],
  imports: [
    
  ],
  exports: [
    ImagePipe,
    AuthGooglePipe
  ]
})
export class PipesModule { }
