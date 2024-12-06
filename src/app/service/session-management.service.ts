import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  constructor() { }

  private sessionKey = 'user_session';
  private sessionName = 'user_name';
  private sessionId = 'user_id';

  // Set the session data in localStorage
  setSession(sessionData: any, sessionName: any, sessionId: any): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    localStorage.setItem(this.sessionName, JSON.stringify(sessionName));
    localStorage.setItem(this.sessionId, JSON.stringify(sessionId));
      // Retrieve session data from localStorage
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }

  getSessionName(): any | null {
    const session = localStorage.getItem(this.sessionName);
    return session ? JSON.parse(session) : null;
  }
  getSessionId(): any | null {
    const session = localStorage.getItem(this.sessionId);
    return session ? JSON.parse(session) : null;
  }


  // End the session by removing the session data
  endSession(): void {
    localStorage.removeItem(this.sessionKey);
    localStorage.removeItem(this.sessionName);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  // Optionally handle session expiry (add your logic)
  handleSessionExpiry(): void {
    // Example: Implement session expiration logic here
  }

}
