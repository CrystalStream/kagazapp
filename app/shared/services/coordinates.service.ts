import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../utils/store'

@Injectable()
export class CoordinatesService {

  constructor(private http: HttpClient) { }

  getCoordenates(address: string) {
    const googleUrl = 'http://maps.google.com/maps/api/geocode/json?address='+address;
    return this.http.get(googleUrl);
  }
}