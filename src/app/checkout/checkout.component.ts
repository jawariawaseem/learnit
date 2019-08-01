import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	cart = [];
	cartTotal = 0;
	checkoutForm = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		email: ['', Validators.required],
		addressOne: ['', Validators.required],
		addressTwo: ['', Validators.required],
		country: ['', Validators.required],
		state: ['', Validators.required],
		zip: ['', Validators.required],
	});
	constructor(private fb: FormBuilder, private productsService: ProductsService) { }
	ngOnInit() {
		this.productsService.getCart().subscribe(data => {
			this.cart = [...data];
			this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price),0);
		});
	}
	doCheckout(){
		console.log(this.checkoutForm.value);
	}
}
