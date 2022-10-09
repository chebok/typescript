class Product {
  constructor(public id: number, public name: string, public price: number) {}
};

class Delivery {
  constructor(private date: Date) {}
}

type DeliveryOpts = HomeDelivery | ShopDelivery;

class ShopDelivery extends Delivery {
  constructor(private idShop: number) {
    super(new Date());
  }
}

class HomeDelivery extends Delivery {
  constructor(date: Date, public adress: string) {
    super(date);
  }
}

class Cart {
  private products: Product[] = [];
  private delivery: DeliveryOpts;

  addProduct(product: Product): void {
    this.products.push(product);
  }

  rmProduct(productId: number): void {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  cartCount(): number {
    const result = this.products.reduce((sum , product) => sum + product.price, 0);
    return result;
  }

  setDelivery(delivery: DeliveryOpts): void {
    this.delivery = delivery;
  }

  checkout(): boolean {
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