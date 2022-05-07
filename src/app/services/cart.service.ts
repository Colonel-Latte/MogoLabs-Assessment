import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any=[]
  public productList = new BehaviorSubject<any> ([]);
  
  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product : any){

    let found= false;

    if(this.cartItemList.length != 0){
      for (let i in this.cartItemList){
        if(this.cartItemList[i].name === product.name){
          this.cartItemList[i].quantity++;
          found = true;
        }
      }

      if(!found){
        this.cartItemList.push(product);
      }

    } else{
      this.cartItemList.push(product);
    }
  
    this.productList.next(this.cartItemList);
    this.getTotalPrice();  
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a : any)=>{
      grandTotal += a.total
    })
    return grandTotal;
  }

  removeCartItem(product : any){
    this.cartItemList.map((cartItem:any, index:any)=>{
      if(product.name === cartItem.name){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCartItem(){
    this.cartItemList= [];
    this.productList.next(this.cartItemList);
  }
}
