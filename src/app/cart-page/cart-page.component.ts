import { Component, OnInit, Input, IterableDiffers } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {


  cartProducts = []
  totalPrice = 0
  added = ''
  form : FormGroup
  submitted = false
  number = 0
  index = ''
  
//   currentVal = 0
//   getVal(val)  { 
//     console.warn(val)
//     this.currentVal=val
//  }

  // getVal (item) {
  //   console.log(item.target.value)
  // }

  // number = this.getVal

  constructor(
    private productServ : ProductService,
    private orderServ : OrderService
  ) { }


  ngOnInit() {

    this.cartProducts = this.productServ.cartProducts

    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price

      // * this.form.value.number
    }
    // for (let i = 0; i < this.number; i++) {
    //   this.number += +this.number;
    // }

    // this.number = this.number
    // for (let i = 0; i < this.number; i++) {
    //   this.totalPrice += +this.number[i].price      
    // }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
      // number: new FormControl('1')

    })
    
    
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.totalPrice)
    console.log(this.cartProducts)

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      // number: cartProduct.amount,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.total(),
      // price: this.totalPrice,
      date: new Date()
    }
    
    console.log(this.form)
    this.orderServ.create(order).subscribe( res => {
      this.form.reset()
      this.added = 'Delivery is framed'
      this.submitted = false
    })
  }

  delete(product) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }
  yourFunction(i: number) {
    // alert(i);
  }
  add(cartProduct) {
    if(
      !cartProduct.amount
    )
    cartProduct.amount = 0
     cartProduct.amount  = cartProduct.amount + 1
    console.log(cartProduct)
  }
  minus(cartProduct) {
    if(
      !cartProduct.amount 
    )cartProduct.amount = 0
    cartProduct.amount = cartProduct.amount - 1
    
  }
  total() {
    return this.cartProducts.reduce((b, a) => (a.amount | 0) * a.price + b, 0)
  }

}
