import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: cartItem[];
  public productList = new BehaviorSubject<cartItem[]>([]);

  constructor() {
    // Get data in local storage
    this.cartItemList = JSON.parse(localStorage.getItem('items') || '[]');
  }

  // Get Products as Observable
  getProducts() {
    this.productList.next(this.cartItemList);
    return this.productList.asObservable();
  }

  // Set Product
  setProduct(product: cartItem[]) {
    this.cartItemList.push(...product);
    this.syncItems();
    this.productList.next(product);
  }

  // Add to Cart
  addToCart(product: cartItem) {

    // Get data in local storage
    this.cartItemList = JSON.parse(localStorage.getItem('items') || '[]');

    // Declare found boolean
    let found : boolean = false;

    // Check if cartItemList have data
    if (this.cartItemList.length != 0) {

      // Loop cart item list
      for (let i in this.cartItemList) {
        // Check if product is in cart item
        if (this.cartItemList[i].name === product.name) {
          // Update quantity and total
          this.cartItemList[i].quantity++;
          this.cartItemList[i].total = this.cartItemList[i].price * this.cartItemList[i].quantity;
          found = true;
        }
      }

      //if product is not found then push product
      if (!found) {
        this.cartItemList.push(product);
      }

    } 
    //else push product
    else {
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
