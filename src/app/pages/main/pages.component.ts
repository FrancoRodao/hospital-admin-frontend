import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { SidebarService } from 'src/app/services/shared/sidebar.service';

declare function init_plugins()

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService,
    private sideBarService: SidebarService) { }

  ngOnInit(): void {
    init_plugins()
    this.sideBarService.loadMenu()
    this.settingsService.loadSettings()

  }

}
