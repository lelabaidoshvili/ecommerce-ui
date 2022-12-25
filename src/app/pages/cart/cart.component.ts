import {Component, OnInit} from '@angular/core';
import {CartService, OrderService} from "../../core/services";
import {Cart} from "../../core/interfaces/cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartItems: Cart[] = []
  cartSum = 0
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {
  }
  ngOnInit() {

  this.getCart()
  }
  getCart() {
    return this.cartService.getCarts()
      .pipe()
      .subscribe(res =>{
        this.cartItems = res;
        this.cartSum = this.cartItems.reduce((acc,item) => acc+ item.total, 0)
        console.log(this.cartItems)
      })
  }

  removeItem(item: Cart) {
    this.cartService.deleteItem(item.id)
      .pipe()
      .subscribe(() => {
        this.getCart()
      })
  }


  checkout() {
  this.orderService.createOrder()
    .pipe()
    .subscribe( res => {
      console.log(res)
      this.getCart()
    })

  }
}
