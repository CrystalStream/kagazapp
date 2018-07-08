import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../utils/store'

@Injectable()
export class BathroomService {

  constructor(private http: HttpClient) { }

  register(bathroomAddress: IBathroom) {
    const registerUlr = 'https://kgazapp.firebaseio.com/to.json'
    return this.http.post(registerUlr, bathroomAddress)
  }

  
}