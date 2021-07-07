import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  RUTAS;
  constructor() { }

  ngOnInit(): void {
    this.RUTAS = this.rutas();
  }

  rutas(){
    return [
      {
        link: '/cuenta',
        icon: 'fa fa-clipboard',
        title: 'Mi cuenta'
      },
      {
        link: '/mapa',
        icon: 'fa fa-clipboard',
        title: 'Mapa'
      },
      {
        link: '/imagenes',
        icon: 'fa fa-clipboard',
        title: 'Imagenes'
      }
    ]
  }

}
