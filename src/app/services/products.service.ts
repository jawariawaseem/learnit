import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	_products = [];
	_cart = [];
	productsSub;
	cartSub;
	constructor() {
		this.productsSub = new BehaviorSubject<any[]>(this._products);
		this.cartSub = new BehaviorSubject<any[]>(this._cart);
	}
	fetchProducts(){
		const items = [
		{
			id: 1,
			name: 'Course #  1',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventor',
			price: 12
		},
		{
			id: 2,
			name: 'Course #  2',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventor',
			price: 12
		},
		{
			id: 3,
			name: 'Course #  3',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventor',
			price: 12
		},
		{
			id: 4,
			name: 'Course #  4',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventor',
			price: 12
		},
		];
		this._products = [...items];
		this.productsSub.next([...this._products]);
	}
	getProducts(){
		return this.productsSub.asObservable();
	}
	getCart(){
		return this.cartSub.asObservable();
	}
	addToCart(id){
		const product = this.findItemInProducts(id);
		if(product.length !== 0){
			if(this.findItemInCart(id).length){
				this.removeFromCart(id);
			}
			else{
				this._cart.push(product[0]);
			}
			this.cartSub.next([...this._cart]); //updates cart
		}
	}
	findItemInCart(id){
		const item = this._cart.filter(product => product.id === id);
		return item;
	}
	findItemInProducts(id){
		const item = this._products.filter(product => product.id === id);
		return item;
	}
	removeFromCart(id){
		if(this.findItemInCart(id).length){
			const item = this.findItemInCart(id)[0];
			const index = this._cart.indexOf(item);
			this._cart.splice(index,1);
		}
		this.cartSub.next([...this._cart]);
	}
}
