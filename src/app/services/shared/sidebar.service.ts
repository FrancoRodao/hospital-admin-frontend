import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'main',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Dashboard',url: '/dashboard'},
        {title: 'Profile',url: '/profile'},
        {title: 'Progress bar',url: '/progress'},
        {title: 'Graficos',url: '/graficas'},
        {title: 'Promesas',url: '/promesas'},
        {title: 'RXJS',url: '/rxjs'}
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Users', url: '/users'},
        {title: 'Doctors', url: '/doctors'},
        {title: 'Hospitals', url: '/hospitals'}
      ]
    }
  ]

  constructor() { }
}
