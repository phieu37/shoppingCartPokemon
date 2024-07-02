"use strict";
// / <reference path="./libs/jquery.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("./cart");
const validate_1 = require("./libs/validate");
const product_repository_1 = require("./product-repository");
let productRepository = new product_repository_1.ProductRepository();
let carObj = new cart_1.Cart();
let products = productRepository.getItems();
// console.log('🚀 ~ products:', products)
// ĐN các hằng số
var MElement;
(function (MElement) {
    MElement.ELM_LIST_PRODUCT = "#list-product";
    MElement.ELM_NOTIFICATION = "#mnotification";
    MElement.ELM_CART_BODY = "#my-cart-body";
    MElement.ELM_CART_FOOTER = "#my-cart-footer";
})(MElement || (MElement = {}));
var MNotification;
(function (MNotification) {
    MNotification.NOTI_READY_TO_BUY = "Ready to buy product";
    MNotification.NOTI_GREATER_THAN_ONE = "Quantity must equal or greater than 1";
    MNotification.NOTI_ACT_ADD = "Added successfull !!";
    MNotification.NOTI_ACT_UPDATE = "Updated successfull !!";
    MNotification.NOTI_ACT_DELETE = "Deleted successfull !!";
})(MNotification || (MNotification = {}));
// Hiển thị danh sách sản phẩm
function showListProduct() {
    $(MElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}
// Hiển thị thông báo
function showNotification(str) {
    $(MElement.ELM_NOTIFICATION).html(str);
}
// Hiển thị giỏ hàng:
function showCart() {
    $(MElement.ELM_CART_BODY).html(carObj.showCartBodyInHtml());
    $(MElement.ELM_CART_FOOTER).html(carObj.showCartFooterInHTML());
}
// Add Product
function addProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        let product = productRepository.getItemById(id);
        carObj.addProduct(product, quantity);
        showCart();
        showNotification(MNotification.NOTI_ACT_ADD);
    }
    else {
        showNotification(MNotification.NOTI_GREATER_THAN_ONE);
    }
}
// Update Product
function updateProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        let product = productRepository.getItemById(id);
        carObj.updateProduct(product, quantity);
        showCart();
        showNotification(MNotification.NOTI_ACT_UPDATE);
    }
    else {
        showNotification(MNotification.NOTI_GREATER_THAN_ONE);
    }
}
// Delete Product
function deleteProduct(id) {
    let product = productRepository.getItemById(id);
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
            let id = $(this).data("product");
            let quantity = parseInt($("input[name = 'quantity-product-" + id + "']").val());
            addProduct(id, quantity);
        });
        // Update Product
        $(document).on("click", "a.update-cart-item", function () {
            let id = $(this).data("product");
            let quantity = parseInt($("input[name = 'cart-item-quantity-" + id + "']").val());
            updateProduct(id, quantity);
        });
        // Delete Product
        $(document).on("click", "a.delete-cart-item", function () {
            let id = $(this).data("product");
            deleteProduct(id);
        });
    });
});
