import { Component, OnInit,  } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = this.getTotalItems(res);
    })
  }

  getTotalItems(productList : any){
    let itemTotal = 0;
    productList.forEach((item : any) => {
      itemTotal += item.quantity
    });
      return itemTotal;
    }
  }
