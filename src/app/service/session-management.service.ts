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
  private password = '2024EatMapUAA'; 

  // Set the session data in localStorage
  setSession(sessionData: any, sessionName: any, sessionId: any): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(this.encrypt(sessionData)));
    localStorage.setItem(this.sessionName, JSON.stringify(this.encrypt(sessionName)));
    localStorage.setItem(this.sessionId, JSON.stringify(this.encrypt(sessionId.toString())));
      // Retrieve session data from localStorage
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.sessionKey);
    return session ? this.decrypt(JSON.parse(session)) : null;
  }

  getSessionName(): any | null {
    const session = localStorage.getItem(this.sessionName);
    return session ? this.decrypt(JSON.parse(session)) : null;
  }
  getSessionId(): any | null {
    const session = localStorage.getItem(this.sessionId);
    return session ? Number(this.decrypt(JSON.parse(session))) : null;
  }


  // End the session by removing the session data
  endSession(): void {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.sessionName);
    localStorage.removeItem(this.sessionId);
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
