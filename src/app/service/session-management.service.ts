import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  constructor() { }

  private sessionKey = 'user_session';
  private sessionName = 'user_name';
  private sessionId = 'user_id';
  private tokenKey = 'user_token';
  private password = '2024EatMapUAA'; 

  // Set the session data in localStorage
  setSession(sessionData: any, sessionName: string, sessionId: string, token?: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.sessionKey, JSON.stringify(this.encrypt(sessionData)));
      localStorage.setItem(this.sessionName, JSON.stringify(this.encrypt(sessionName)));
      localStorage.setItem(this.sessionId, JSON.stringify(this.encrypt(sessionId.toString())));
      
      // Almacenar el token si está disponible
      if (token) {
        localStorage.setItem(this.tokenKey, JSON.stringify(this.encrypt(token)));
        console.log('Token almacenado:', token);
      }
    }
  }

  getSession(): any | null {
    if (typeof localStorage !== 'undefined') {
      const session = localStorage.getItem(this.sessionKey);
      return session ? this.decrypt(JSON.parse(session)) : null;
    }
    return null;
  }

  getSessionName(): any | null {
    if (typeof localStorage !== 'undefined') {
      const session = localStorage.getItem(this.sessionName);
      return session ? this.decrypt(JSON.parse(session)) : null;
    }
    return null;
  }
  getSessionId(): any | null {
    if (typeof localStorage !== 'undefined') {
      const session = localStorage.getItem(this.sessionId);
      return session ? String(this.decrypt(JSON.parse(session))) : null;
    }
    return null;
  }

  // Obtener el token almacenado
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.tokenKey);
      return token ? this.decrypt(JSON.parse(token)) : null;
    }
    return null;
  }


  // End the session by removing the session data
  endSession(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.sessionKey);
      localStorage.removeItem(this.sessionName);
      localStorage.removeItem(this.sessionId);
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  // Optionally handle session expiry (add your logic)
  handleSessionExpiry(): void {
    // Example: Implement session expiration logic here
  }

  encrypt(data: any): string{
    return CryptoJS.AES.encrypt(data, this.password).toString(); 
  }

  decrypt(data: string): any{
    const decrypted = CryptoJS.AES.decrypt(data, this.password);
    const str = decrypted.toString(CryptoJS.enc.Utf8);
    return str; 
  }
}
