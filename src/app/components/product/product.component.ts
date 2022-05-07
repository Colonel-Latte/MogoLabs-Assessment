import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList: any;

  constructor(private api: MockApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res=>{
      this.productList = res;

      this.productList.forEach((product:any) => {
        Object.assign(product,{quantity:1, total:product.price})
      });
    });
  }

  addToCart(item : any){
    this.cartService.addToCart(item);
  }

}
