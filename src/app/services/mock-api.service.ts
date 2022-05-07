import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor() { }

  getProduct(){

    const products = [
      {
        name: 'Sledgehammer',
        price: 125.75
      }, 
      {
        name: 'Axe',
        price: 190.50
      }, 
      {
        name: 'Bandsaw',
        price: 562.13
      }, 
      {
        name: 'Chisel',
        price: 12.9
      }, 
      {
        name: 'Hacksaw',
        price: 18.45
      }, 
    ]

    return of(products);; 
  }
}
