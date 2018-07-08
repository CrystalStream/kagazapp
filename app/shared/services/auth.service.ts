import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: ICredentials) {
    const loginUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC7S_3j3CvggOWijQHCIxZcM1hMJ4CPzBM'
    return this.http.post(loginUrl, credentials)
  }

  register(credentials: ICredentials) {
    const registerUlr = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC7S_3j3CvggOWijQHCIxZcM1hMJ4CPzBM'
    return this.http.post(registerUlr, credentials)
  }

  logout() {
    
  }

  
}