import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  // Lista de marcadores actualmente en el mapa
  private markers: google.maps.Marker[] = [];

  // Última ruta calculada
  private directions: google.maps.DirectionsResult | null = null;

  // Ubicaciones fijas (e.g., cafeterías)
  private readonly locations = [
    { name: 'Cafetería Oriente', lat: 21.91333005172924, lng: -102.3177198072269 },
    { name: 'Cafetería Sur', lat: 21.91004201576672, lng: -102.31501547251274 },
    { name: 'Comedor Universitario', lat: 21.91411622573199, lng: -102.31482989466306 },
    { name: 'Cafetería de Ciencias de la Salud', lat: 21.917095318659914, lng: -102.31512975243545 },
    { name: 'Cafetería Norte', lat: 21.917126064175687, lng: -102.31930547335344 },
  ];

  // Obtener los marcadores
  get savedMarkers(): google.maps.Marker[] {
    return this.markers;
  }

  // Establecer los marcadores
  set savedMarkers(markers: google.maps.Marker[]) {
    this.markers = markers;
  }

  // Obtener la última ruta calculada
  get savedDirections(): google.maps.DirectionsResult | null {
    return this.directions;
  }

  // Establecer la última ruta calculada
  set savedDirections(directions: google.maps.DirectionsResult | null) {
    this.directions = directions;
  }

  // Obtener las ubicaciones originales
  get savedLocations() {
    return this.locations;
  }

  // Agregar un marcador
  addMarker(marker: google.maps.Marker): void {
    this.markers.push(marker);
  }

  // Limpiar el estado del servicio
  clearState(): void {
    this.markers.forEach((marker) => marker.setMap(null)); // Quitar del mapa
    this.markers = [];
    this.directions = null;
  }
}
