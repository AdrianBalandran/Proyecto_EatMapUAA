import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapStateService } from '../map-state.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MenunavComponent } from "../menunav/menunav.component";

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
  map!: google.maps.Map; // Declara la propiedad `map`
  lastInstructionIndex = 0; // Para recordar el índice de la última indicación dada

  constructor(private mapStateService: MapStateService) {}

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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
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

    // Restaurar estado anterior si existe
    this.restoreState();

    // Obtener ubicación del usuario y calcular ruta
    this.getUserLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userPos = { lat: position.coords.latitude, lng: position.coords.longitude };
          this.map.setCenter(userPos);

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

    // Limpiar marcadores previos en el mapa
    this.mapStateService.savedMarkers.forEach((marker) => marker.setMap(null));
    this.mapStateService.savedMarkers = [];

    // Iterar sobre las ubicaciones guardadas en el servicio
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

            // Guardar todas las instrucciones de la ruta para poder decidir cuándo dar indicaciones
            routeInstructions.length = 0; // Limpiar instrucciones anteriores
            result.routes[0].legs[0].steps.forEach((step) => routeInstructions.push(step));

            // Actualizar las indicaciones de voz si es necesario
            this.checkAndSpeakInstruction(userPos, routeInstructions);
            this.mapStateService.savedDirections = result; // Guardar ruta
          }
        } else {
          console.error('Error calculando la ruta:', status);
        }
      });

      // Agregar marcadores para ubicaciones fijas
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        title: location.name,
      });
      this.mapStateService.savedMarkers.push(marker);
    });
  }

  private checkAndSpeakInstruction(userPos: google.maps.LatLngLiteral, steps: google.maps.DirectionsStep[]): void {
    if (!this.isVoiceEnabled || steps.length === 0) return;

    // Comparar la distancia a la próxima indicación
    const nextStep = steps[this.lastInstructionIndex];
    const nextStepPosition = nextStep.start_location;

    const distanceToNextStep = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(userPos.lat, userPos.lng),
      nextStepPosition
    );

    // Solo hablar si el usuario está cerca de la siguiente instrucción
    if (distanceToNextStep < 100) { // Umbral de 100 metros para dar una indicación
      const speech = window.speechSynthesis;
      const voices = speech.getVoices();
      const spanishVoice = voices.find((voice) => voice.lang.includes('es')) || voices[0]; // Voz en español

      const utterance = new SpeechSynthesisUtterance(nextStep.instructions.replace(/<[^>]+>/g, ''));
      utterance.voice = spanishVoice;
      speech.speak(utterance);

      // Avanzar al siguiente paso
      this.lastInstructionIndex++;
    }
  }

  private saveState(): void {
    // El estado ya se guarda automáticamente en `mapStateService`
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

