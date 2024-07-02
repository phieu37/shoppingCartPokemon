"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const helpers_1 = require("./libs/helpers");
const product_1 = require("./product");
class ProductRepository {
    constructor() {
        this.products = [];
    }
    // constructor() {
    //   this.addItem(new Product(100, "bulbasaur", "bulbasaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 69));
    //   this.addItem(new Product(101, "charmander", "charmander.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 18));
    //   this.addItem(new Product(102, "ivysaur", "ivysaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 22));
    //   this.addItem(new Product(103, "squirtle", "squirtle.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 65));
    //   this.addItem(new Product(104, "venusaur", "venusaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 19, false));
    // }
    loadProductsFromJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('../data/pokemon.json'); // Thay bằng đường dẫn thực tế tới tệp JSON
                const data = yield response.json();
                this.products = data.map((item) => new product_1.Product(item._id, item._name, item._image, item._sumary, item._price, item._canBuy));
                console.log("Products loaded:", this.products);
            }
            catch (error) {
                console.error("Failed to load products:", error);
            }
        });
    }
    addItem(product) {
        // this.products.push(product);
        this.products[this.products.length] = product;
        // console.log(this.products);
    }
    getItems() {
        // console.log("getItems");
        return this.products;
    }
    getItemById(id) {
        // return new Product(100, "bulbasaur", "bulbasaur.png", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, velit.", 69);
        // Case 01: ko cần duyệt qua hết, tìm thấy là return luôn
        let total = this.products.length;
        for (let i = 0; i < total; i++) {
            if (this.products[i].id == id)
                return this.products[i];
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
    showItemsInHTML() {
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
        }
        else {
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
    showBuyItemInHTML(product) {
        return product.canBuy
            ? `<input name="quantity-product-${product.id}" type="number" value="1" min="1">
         <a data-product="${product.id}" href="#" class="price"> ${helpers_1.Helpers.toCurrency(product.price, "USD", "right")} </a>`
            : `<span class="price">${helpers_1.Helpers.toCurrency(product.price, "USD", "right")}</span>`;
    }
}
exports.ProductRepository = ProductRepository;
