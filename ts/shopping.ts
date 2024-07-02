// / <reference path="./libs/jquery.d.ts" />

import { Cart } from "./cart";
import { Validate } from "./libs/validate";
import { Product } from "./product";
import { ProductRepository } from "./product-repository";

let productRepository = new ProductRepository();
let carObj = new Cart();
let products: Product[] = productRepository.getItems();
// console.log('🚀 ~ products:', products)

// ĐN các hằng số
namespace MElement {
  export const ELM_LIST_PRODUCT: string = "#list-product";
  export const ELM_NOTIFICATION: string = "#mnotification";
  export const ELM_CART_BODY: string = "#my-cart-body";
  export const ELM_CART_FOOTER: string = "#my-cart-footer";
}

namespace MNotification {
  export const NOTI_READY_TO_BUY: string = "Ready to buy product";
  export const NOTI_GREATER_THAN_ONE: string = "Quantity must equal or greater than 1";
  export const NOTI_ACT_ADD: string = "Added successfull !!";
  export const NOTI_ACT_UPDATE: string = "Updated successfull !!";
  export const NOTI_ACT_DELETE: string = "Deleted successfull !!";
}

// Hiển thị danh sách sản phẩm
function showListProduct(): void {
  $(MElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML())
}

// Hiển thị thông báo
function showNotification(str: string): void {
  $(MElement.ELM_NOTIFICATION).html(str);
}

// Hiển thị giỏ hàng:
function showCart(): void {
  $(MElement.ELM_CART_BODY).html(carObj.showCartBodyInHtml());
  $(MElement.ELM_CART_FOOTER).html(carObj.showCartFooterInHTML());
}

// Add Product
function addProduct(id: number, quantity: number) {
  if (Validate.checkQuantity(quantity)) {
    let product: Product = productRepository.getItemById(id);
    carObj.addProduct(product, quantity);
    showCart();
    showNotification(MNotification.NOTI_ACT_ADD);
  } else {
    showNotification(MNotification.NOTI_GREATER_THAN_ONE);
  }
}

// Update Product
function updateProduct(id: number, quantity: number) {
  if (Validate.checkQuantity(quantity)) {
    let product: Product = productRepository.getItemById(id);
    carObj.updateProduct(product, quantity)
    showCart();
    showNotification(MNotification.NOTI_ACT_UPDATE);
  } else {
    showNotification(MNotification.NOTI_GREATER_THAN_ONE);
  }
}

// Delete Product
function deleteProduct(id: number) {
  let product: Product = productRepository.getItemById(id);
  carObj.removeProduct(product);
  showCart();
  showNotification(MNotification.NOTI_ACT_DELETE);
}

$(document).ready(function () {
  productRepository.loadProductsFromJSON().then(() => {
    showListProduct();
    showCart();
    showNotification(MNotification.NOTI_READY_TO_BUY);

    $("a.price").click(function () {
      let id: number = $(this).data("product");
      let quantity: number = parseInt($("input[name = 'quantity-product-" + id + "']").val());
      addProduct(id, quantity);
    });

    // Update Product
    $(document).on("click", "a.update-cart-item", function () {
      let id: number = $(this).data("product");
      let quantity: number = parseInt($("input[name = 'cart-item-quantity-" + id + "']").val());
      updateProduct(id, quantity)
    })

    // Delete Product
    $(document).on("click", "a.delete-cart-item", function () {
      let id: number = $(this).data("product");
      deleteProduct(id)
    })
  })
})