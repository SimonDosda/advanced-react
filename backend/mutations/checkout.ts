import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
import { CartItem } from '../schemas/CartItem';

const graphql = String.raw;

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure the user is signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
    id 
    name 
    email 
    cart {
      id
      quantity
      product {
        id
        name
        price
        description
        photo {
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }`,
  });
  // 2. Calculate the total price for user's order
  const cartItems = user.cart.filter(({ product }) => product);
  const amount = cartItems.reduce(
    (total, cartItem: CartItemCreateInput) =>
      total + (cartItem.product.price * cartItem.quantity) / 100,
    0
  );
  // 3. Create the charge with the Stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  // 4. Convert the cartitems to orderitems
  // 5. Create the Order and return it
}
