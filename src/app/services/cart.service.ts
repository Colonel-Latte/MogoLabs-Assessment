import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: cartItem[];
  public productList = new BehaviorSubject<cartItem[]>([]);

  constructor() {
    this.cartItemList = JSON.parse(localStorage.getItem('items') || '[]');
  }

  getProducts() {
    this.productList.next(this.cartItemList);
    return this.productList.asObservable();
  }

  setProduct(product: cartItem[]) {
    this.cartItemList.push(...product);
    this.syncItems();
    this.productList.next(product);
  }

  addToCart(product: cartItem) {
    this.cartItemList = JSON.parse(localStorage.getItem('items') || '[]');

    let found : boolean = false;

    if (this.cartItemList.length != 0) {
      for (let i in this.cartItemList) {
        if (this.cartItemList[i].name === product.name) {
          this.cartItemList[i].quantity++;
          found = true;
        }
      }

      if (!found) {
        this.cartItemList.push(product);
      }

    } else {
      this.cartItemList.push(product);
    }

    this.productList.next(this.cartItemList);
    this.syncItems();
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: cartItem) => {
      grandTotal += a.total
    })
    return grandTotal;
  }

  removeCartItem(product: cartItem) {
    this.cartItemList.map((cartItem: cartItem, index: number) => {
      if (product.name === cartItem.name) {
        this.cartItemList.splice(index, 1);
        this.syncItems();
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCartItem() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.syncItems();
  }

  syncItems() {
    localStorage.setItem('items', JSON.stringify(this.cartItemList)); // sync the data
  }
}
