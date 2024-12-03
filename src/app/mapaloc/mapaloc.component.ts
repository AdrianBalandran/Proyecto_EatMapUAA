import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MenunavComponent } from "../menunav/menunav.component";

@Component({
  selector: 'app-mapaloc',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule // Importa el módulo aquí
    ,
    MenunavComponent
],
  templateUrl: './mapaloc.component.html',
  styleUrl: './mapaloc.component.css'
})
export class MapalocComponent implements OnInit {
  // Centro del mapa (Aguascalientes)
  center: google.maps.LatLngLiteral = {
    lat: 21.913008704208682,
    lng: -102.3147129607348,
  };
  zoom = 15;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // Direcciones y servicio de cálculo
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;

  // Ubicaciones fijas
  locations = [
    { name: 'Sucursal 1', lat: 21.91333005172924, lng: -102.3177198072269 },
    { name: 'Sucursal 2', lat: 21.91004201576672, lng: -102.31501547251274 },
    { name: 'Sucursal 3', lat: 21.91411622573199, lng: -102.31482989466306 },
  ];

  // Marcador de ubicación actual
  userLocation: google.maps.Marker | undefined;

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    }).catch((error) => {
      console.error('Error al cargar Google Maps:', error);
    });
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptId = 'google-maps-script';
      const apiKey = 'AIzaSyBTL-j-lwteCuz9hqqAvNnuMvlu91Peris';

      if (document.getElementById(scriptId)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);

      document.body.appendChild(script);
    });
  }

  private initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
      ...this.options,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
    });

    // Agregar marcadores para ubicaciones fijas
    this.locations.forEach((location) => {
      new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
      });
    });

    // Obtener la ubicación actual del usuario
    this.getUserLocation(map);
  }

  private getUserLocation(map: google.maps.Map): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Marcador para la ubicación del usuario
          this.userLocation = new google.maps.Marker({
            position: userPos,
            map: map,
            title: 'Tu ubicación',
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          });

          map.setCenter(userPos);

          // Calcular la ruta más cercana
          this.calculateNearestRoute(userPos);
        },
        (error) => {
          console.error('Error obteniendo la ubicación del usuario:', error);
        }
      );
    } else {
      console.warn('Geolocalización no soportada en este navegador');
    }
  }

  private calculateNearestRoute(userPos: google.maps.LatLngLiteral): void {
    if (!this.directionsService || !this.directionsRenderer) return;

    let closestRoute = { distance: Infinity, location: null as any };

    // Iterar sobre las ubicaciones fijas para calcular rutas
    this.locations.forEach((location) => {
      const request: google.maps.DirectionsRequest = {
        origin: userPos,
        destination: { lat: location.lat, lng: location.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService?.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
          const distance = result.routes[0].legs[0].distance?.value ?? Infinity;

          if (distance < closestRoute.distance) {
            closestRoute = { distance, location };
            this.directionsRenderer?.setDirections(result);
          }
        }
      });
    });
  }
}
