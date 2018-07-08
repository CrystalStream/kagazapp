import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../utils/store'

@Injectable()
export class BathroomService {

  bathroomUrl = 'https://kgazapp.firebaseio.com/to.json';

  constructor(private http: HttpClient) { }

  register(bathroom: IBathroom) {
    
    // Av. Constitución, Parque Royal, 28017 Colima, Col."
    const data = {
      address: `${bathroom.street}, ${bathroom.colony}, ${bathroom.pc} ${bathroom.city}, ${bathroom.state}`,
      price: bathroom.price
    }
    return this.http.post(this.bathroomUrl, data)
  }

  getAll() {
    return this.http.get(this.bathroomUrl)
  }

  
}