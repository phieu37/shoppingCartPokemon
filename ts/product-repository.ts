import { Helpers } from "./libs/helpers";
import { Product } from "./product";

export class ProductRepository {
  private products: Product[] = [];

  // constructor() {
  //   this.addItem(new Product(100, "bulbasaur", "bulbasaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 69));
  //   this.addItem(new Product(101, "charmander", "charmander.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 18));
  //   this.addItem(new Product(102, "ivysaur", "ivysaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 22));
  //   this.addItem(new Product(103, "squirtle", "squirtle.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 65));
  //   this.addItem(new Product(104, "venusaur", "venusaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 19, false));
  // }

  public async loadProductsFromJSON() {
    try {
      const response = await fetch('../data/pokemon.json'); // Thay bằng đường dẫn thực tế tới tệp JSON
      const data = await response.json();
      this.products = data.map((item: any) => new Product(
        item._id,
        item._name,
        item._image,
        item._sumary,
        item._price,
        item._canBuy
      ));
      console.log("Products loaded:", this.products);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }

  public addItem(product: Product) {
    // this.products.push(product);
    this.products[this.products.length] = product;
    // console.log(this.products);
  }

  public getItems(): Product[] {
    // console.log("getItems");
    return this.products;
  }

  public getItemById(id: number): Product {
    // return new Product(100, "bulbasaur", "bulbasaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 69);
    // Case 01: ko cần duyệt qua hết, tìm thấy là return luôn
    let total: number = this.products.length
    for (let i: number = 0; i < total; i++) {
      if (this.products[i].id == id) return this.products[i];
    }
    return null;

    // Case 02: duyệt qua hết các p/tử
    // let filter : Product[] = this.products.filter(
    // 	product => product.id == id
    // );

    // if(filter.length > 0) return filter[0];
    // return null;

  }

  // public showItemsInHTML(): string {
  //   let total: number = this.products.length
  //   let xhtmlResult: string = "";

  //   if (total > 0) {
  //     for (let i: number = 0; i < total; i++) {
  //       let currentItem: Product = this.products[i];
  //       // console.log(currentItem);
  //       xhtmlResult += `<div class="media product">
  //                           <div class="media-left">
  //                             <a href="#">
  //                               <img class="media-object" src="img/characters/${currentItem.image}" alt="${currentItem.name}">
  //                             </a>
  //                           </div>
  //                           <div class="media-body">
  //                             <h4 class="media-heading">${currentItem.name}</h4>
  //                             <p>${currentItem.summary}</p>
  //                             ${this.showBuyItemInHTML(currentItem)}
  //                           </div>
  //                       </div>`;
  //     }
  //   } else {
  //     xhtmlResult = "Empty product in my shop";
  //   }
  //   return xhtmlResult;
  // }

  public showItemsInHTML(): string {
    if (this.products.length > 0) {
      return this.products.map(product => `
        <div class="media product">
          <div class="media-left">
            <a href="#">
              <img class="media-object" src="img/characters/${product.image}" alt="${product.name}">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${product.name}</h4>
            <p>${product.summary}</p>
            ${this.showBuyItemInHTML(product)}
          </div>
        </div>
      `).join('');
    } else {
      return "Empty product in my shop";
    }
  }

  // private showBuyItemInHTML(product: Product): string {
  //   let xhtmlResult: string = "";

  //   if (product.canBuy == true) {
  //     xhtmlResult = `<input name="quantity-product-${product.id}" type="number" value="1" min="1">
  //   						<a data-product="${product.id}" href="#" class="price"> ${Helpers.toCurrency(product.price, "USD", "right")} </a>`;
  //   } else {
  //     xhtmlResult = `<span class="price">${Helpers.toCurrency(product.price, "USD", "right")}</span>`;
  //   }
  //   return xhtmlResult;
  // }

  private showBuyItemInHTML(product: Product): string {
    return product.canBuy
      ? `<input name="quantity-product-${product.id}" type="number" value="1" min="1">
         <a data-product="${product.id}" href="#" class="price"> ${Helpers.toCurrency(product.price, "USD", "right")} </a>`
      : `<span class="price">${Helpers.toCurrency(product.price, "USD", "right")}</span>`;
  }
}