import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapStateService } from '../map-state.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MenunavComponent } from "../menunav/menunav.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mapaloc',
  standalone: true,
  imports: [GoogleMapsModule, MenunavComponent],
  templateUrl: './mapaloc.component.html',
  styleUrls: ['./mapaloc.component.css'],
})
export class MapalocComponent implements OnInit, OnDestroy {
  center: google.maps.LatLngLiteral = { lat: 21.913008704208682, lng: -102.3147129607348 };
  zoom = 15;
  options: google.maps.MapOptions = { disableDefaultUI: true, zoomControl: true };

  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  isVoiceEnabled = true;
  map!: google.maps.Map;
  userMarker!: google.maps.Marker | null; // Marcador para el usuario
  lastInstructionIndex = 0;
  activeInfoWindow!: google.maps.InfoWindow | null;

  constructor(private mapStateService: MapStateService, private titleser: Title) {
    this.titleser.setTitle("EatMapUAA | Mapa Sucursales");
  }

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    }).catch((error) => console.error('Error al cargar Google Maps:', error));
  }

  ngOnDestroy(): void {
    this.saveState(); // Guarda el estado del mapa al destruir el componente
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  private initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
      ...this.options,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({ map: this.map });

    this.restoreState();
    this.getUserLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userPos = { lat: position.coords.latitude, lng: position.coords.longitude };
          this.map.setCenter(userPos);

          if (this.userMarker) {
            this.userMarker.setPosition(userPos);
          } else {
            this.userMarker = new google.maps.Marker({
              position: userPos,
              map: this.map,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              },
            });
          }

          this.calculateNearestRoute(userPos);
        },
        (error) => console.error('Error obteniendo la ubicación del usuario:', error),
        { enableHighAccuracy: true }
      );
    } else {
      console.warn('Geolocalización no soportada en este navegador');
    }
  }

  private calculateNearestRoute(userPos: google.maps.LatLngLiteral): void {
    if (!this.directionsService || !this.directionsRenderer || !this.map) return;

    let closestRoute = { distance: Infinity, location: null as any };
    const routeInstructions: google.maps.DirectionsStep[] = [];

    this.mapStateService.savedMarkers.forEach((marker) => marker.setMap(null));
    this.mapStateService.savedMarkers = [];

    this.mapStateService.savedLocations.forEach((location) => {
      const request: google.maps.DirectionsRequest = {
        origin: userPos,
        destination: { lat: location.lat, lng: location.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
          const distance = result.routes[0].legs[0].distance?.value ?? Infinity;

          if (distance < closestRoute.distance) {
            closestRoute = { distance, location };
            this.directionsRenderer.setDirections(result);

            routeInstructions.length = 0;
            result.routes[0].legs[0].steps.forEach((step) => routeInstructions.push(step));

            this.checkAndSpeakInstruction(userPos, routeInstructions);
            this.mapStateService.savedDirections = result;
          }
        }
      });

      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        title: location.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div><strong>${location.name}</strong></div>`,
      });

      marker.addListener('click', () => {
        if (this.activeInfoWindow) this.activeInfoWindow.close();
        infoWindow.open(this.map, marker);
        this.activeInfoWindow = infoWindow;
      });

      this.mapStateService.savedMarkers.push(marker);
    });
  }

  private checkAndSpeakInstruction(userPos: google.maps.LatLngLiteral, steps: google.maps.DirectionsStep[]): void {
    if (!this.isVoiceEnabled || steps.length === 0 || this.lastInstructionIndex >= steps.length) return;

    const nextStep = steps[this.lastInstructionIndex];
    const nextStepPosition = nextStep.start_location;

    const distanceToNextStep = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(userPos.lat, userPos.lng),
      nextStepPosition
    );

    if (distanceToNextStep < 100) {
      const speech = window.speechSynthesis;
      const voices = speech.getVoices();
      const spanishVoice = voices.find((voice) => voice.lang.includes('es')) || voices[0];

      const utterance = new SpeechSynthesisUtterance(nextStep.instructions.replace(/<[^>]+>/g, ''));
      utterance.voice = spanishVoice;
      speech.speak(utterance);

      this.lastInstructionIndex++;
    }
  }

  private saveState(): void {
    // Estado ya manejado
  }

  private restoreState(): void {
    if (this.mapStateService.savedMarkers.length) {
      this.mapStateService.savedMarkers.forEach((marker) => marker.setMap(this.map));
    }

    if (this.mapStateService.savedDirections && this.directionsRenderer) {
      this.directionsRenderer.setDirections(this.mapStateService.savedDirections);
    }
  }

  toggleVoice(): void {
    this.isVoiceEnabled = !this.isVoiceEnabled;

    if (!this.isVoiceEnabled) {
      window.speechSynthesis.cancel();
    }
  }
}
