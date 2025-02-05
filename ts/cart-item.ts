import { Helpers } from "./libs/helpers";
import { Product } from "./product"

export class CartItem {
	private _product: Product;
	private _quantity: number;

	constructor(product: Product, quantity: number = 1) {
		this._product = product;
		this._quantity = quantity;
	}

	public showCartItemInHTML(index: number): string {
		// console.log(this);
		return `<tr>
					<th scope="row">${index}</th>
					<td>${this.product.name}</td>
					<td>${Helpers.toCurrency(this.product.price, "USD", "right")}</td>
					<td><input name="cart-item-quantity-${this.product.id}" type="number" value="${this.quantity}" min="1"></td>
					<td><strong>${Helpers.toCurrency(this.getSubtotal(), "USD", "right")}</strong></td>
					<td>
						<a class="label label-info update-cart-item" href="#" data-product="${this.product.id}">Update</a>
						<a class="label label-danger delete-cart-item" href="#" data-product="${this.product.id}">Delete</a>
					</td>
				</tr>`;
	}

	public getSubtotal(): number {
		// console.log(this);
		return this.product.price * this.quantity;
	}

	public get quantity(): number {
		return this._quantity;
	}

	public set quantity(v: number) {
		this._quantity = v;
	}

	public get product(): Product {
		return this._product;
	}

	public set product(v: Product) {
		this._product = v;
	}

}