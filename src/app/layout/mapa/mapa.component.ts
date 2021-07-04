import { Component, OnInit } from '@angular/core';


declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  UBICACION_DESTINO:any;
  UBICACION_ORIGEN: any;

  mapEle: HTMLElement; // referencia al identificador del template.
  map: any;
  directionsService = new google.maps.DirectionsService(); // retorna la ruta optima
  directionsRenderer = new google.maps.DirectionsRenderer(); // renderiza la ruta optima

  constructor() {
  }
  
  ngOnInit(): void {
    this.obtenerUbicacion().then((data) => {
      this.UBICACION_ORIGEN = data;
      this.cargarMapa();
    }
    )
    .catch( () => {
      console.log('Hubo un error al intentar recuperar su ubicación');
    }
    );
    this.UBICACION_DESTINO = {"lat": -8.107791, "lng": -79.030251 }
    
  }

  obtenerUbicacion = () => { 
    let data;
    const ubicacionPromise = new Promise((resolve, reject) => {
      if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(
          (position) => {
            data = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            resolve({"lat":data.lat, "lng":data.lng});
        } ,
        (err) => {
          console.log(' Advertencia: El servicio de geolocalización no se puede realizar, debido que bloqueó la ubicación.  ');
          reject(err);
        }  
        );
  
      }
      else {
        console.log(' Error: El navegador no soporta la geolocalización.');
        reject('Error: El navegador no soporta la geolocalización.');
      }  
    });
    return ubicacionPromise;
  }

  cargarMapa() {
    this.mapEle  = document.getElementById('map'); // Obtenemos la referencia del html, mediante el id del div.

    this.map = new google.maps.Map(this.mapEle, { // se crea el mapa con sus punto de origen.
      center: new google.maps.LatLng(this.UBICACION_ORIGEN.lat, this.UBICACION_ORIGEN.lng)  ,
      zoom: 15
    });


    this.directionsRenderer.setMap(this.map); // Escribimos sobre el mapa

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.calculateRoute(); // se calcula la ruta entre el especialista y el cliente.
    });

  }

  calculateRoute() {
    this.directionsService.route({
      origin: this.UBICACION_ORIGEN,
      destination: this.UBICACION_DESTINO ,
      travelMode: google.maps.TravelMode.WALKING, // Modo de trazado(caminando, en taxi, ...)
    }, (response, status)  => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response); // Dibujamos la ruta desde el punto A hacia el punto B.
      } else {
        switch (status) { // En caso de haber un error, se mostrará diferentes estado obtenidos de Google Maps.
          case 'ZERO_RESULTS':
            console.log('No se pudo encontrar ninguna ruta entre el origen y el destino.');
            break;
          case 'UNKNOWN_ERROR':
            console.log('No se pudo procesar una solicitud de indicaciones debido a un error del servidor.');
            break;
          case 'OVER_QUERY_LIMIT':
            console.log('La página web superó el límite de solicitudes en un período de tiempo demasiado corto.');
            break;
          case 'NOT_FOUND':
            console.log( 'No se pudo geocodificar al menos uno de los puntos de origen o destino.');
            break;
        }
      }
    });
  }

}
