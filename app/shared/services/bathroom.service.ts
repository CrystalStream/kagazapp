import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../utils/store'

@Injectable()
export class BathroomService {

  constructor(private http: HttpClient) { }

  register(bathroom: IBathroom) {
    const registerUlr = 'https://kgazapp.firebaseio.com/to.json';
    // Av. Constitución, Parque Royal, 28017 Colima, Col."
    const data = {
      address: `${bathroom.street}, ${bathroom.colony}, ${bathroom.pc} ${bathroom.city}, ${bathroom.state}`,
      price: bathroom.price
    }
    return this.http.post(registerUlr, data)
  }

  
}