import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  public savedMarkers: google.maps.Marker[] = []; // Marcadores en el mapa
  public savedDirections: google.maps.DirectionsResult | null = null; // Última ruta calculada
  public savedLocations = [ // Ubicaciones originales
    { name: 'Cafetería Oriente', lat: 21.91333005172924, lng: -102.3177198072269 },
    { name: 'Cafetería Sur', lat: 21.91004201576672, lng: -102.31501547251274 },
    { name: 'Comedor Universitario', lat: 21.91411622573199, lng: -102.31482989466306 },
    { name: 'Cafetería de Ciencias de la Salud', lat: 21.917095318659914, lng: -102.31512975243545 },
    { name: 'Cafetería Norte', lat: 21.917126064175687, lng: -102.31930547335344 },
  ];

  clearState(): void {
    this.savedMarkers = [];
    this.savedDirections = null;
  }
}
