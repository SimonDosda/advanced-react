import { CartItemT } from '../components/User';

export default function calcTotalPrice(cartItems: CartItemT[]): number {
  return cartItems.reduce((total, { product, quantity }) => {
    if (!product) {
      return total;
    }
    return total + product.price * quantity;
  }, 0);
}
