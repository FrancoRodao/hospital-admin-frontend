import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document,
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.applyCheckSettings()
  }

  changeColor(theme: string, link: any){
    this.applyCheck(link)
    this.settingsService.applyTheme(theme)
  }

  applyCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector')

    for (const ref of selectores) {
      ref.classList.remove('working')
    }

    link.classList.add('working')

  }

  applyCheckSettings(){
    let selectores: any = document.getElementsByClassName('selector')
    let theme = this.settingsService.settings.theme
    for (const ref of selectores) {
      if(ref.getAttribute('data-theme') == theme){
        ref.classList.add('working')
        break;
      }
    }

  }

  //INTENTAR HACERLO CON  ngClass LO DE CAMBIAR EL TEMA

}
