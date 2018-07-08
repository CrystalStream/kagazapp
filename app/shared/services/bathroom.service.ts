import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../utils/store'

@Injectable()
export class BathroomService {

  constructor(private http: HttpClient) { }

  register(bathroomAddress: IBathroom) {
    const registerUlr = 'https://kgazapp.firebaseio.com/to.json';
    // Av. Constitución, Parque Royal, 28017 Colima, Col."
    const data = {
      address: `${bathroomAddress.street}, ${bathroomAddress.colony}, ${bathroomAddress.pc} ${bathroomAddress.city}, ${bathroomAddress.state}`
    }
    return this.http.post(registerUlr, data)
  }

  
}