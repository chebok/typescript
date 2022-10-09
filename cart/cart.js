"use strict";
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
;
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class ShopDelivery extends Delivery {
    constructor(idShop) {
        super(new Date());
        this.idShop = idShop;
    }
}
class HomeDelivery extends Delivery {
    constructor(date, adress) {
        super(date);
        this.adress = adress;
    }
}
class Cart {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    rmProduct(productId) {
        this.products = this.products.filter((product) => product.id !== productId);
    }
    cartCount() {
        const result = this.products.reduce((sum, product) => sum + product.price, 0);
        return result;
    }
    setDelivery(delivery) {
        this.delivery = delivery;
    }
    checkout() {
        return (this.products.length > 0 && (!!this.delivery));
    }
}
const cart = new Cart();
cart.addProduct(new Product(1, 'Печенье', 10));
cart.addProduct(new Product(2, 'Торт', 30));
cart.addProduct(new Product(3, 'Шоколад', 20));
cart.rmProduct(1);
cart.setDelivery(new HomeDelivery(new Date(), 'home'));
console.log(cart.cartCount());
console.log(cart.checkout());
