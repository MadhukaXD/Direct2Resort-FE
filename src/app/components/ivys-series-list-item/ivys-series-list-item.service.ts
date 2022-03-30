import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IvysSeriesListItemService {
  private cartItems = new BehaviorSubject(
    {
      product: null,
      qty: 0
    }
  );
  currentCart = this.cartItems.asObservable();
  constructor() { } 

  updateCart(cart) {
    this.cartItems.next(cart);
  }
}
