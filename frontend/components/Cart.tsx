import styled from 'styled-components';
import CartStyles from '../atoms/CartStyles';
import CloseButton from '../atoms/CloseButton';
import Supreme from '../atoms/Supreme';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import formatMoney from '../lib/formatMoney';
import { CartItemT, useUser } from './User';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
  footer {
    display: block;
  }
`;

function CartItem({ cartItem }: { cartItem: CartItemT }) {
  const { product, quantity, id } = cartItem;
  return (
    <CartItemStyles>
      <img
        width='100'
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>
        {formatMoney(product.price * quantity)} |
        <em>
          {quantity} &times; {formatMoney(product.price)}
        </em>
      </p>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!user) {
    return <p>please log in</p>;
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s cart</Supreme>
        <CloseButton onClick={closeCart}>Close</CloseButton>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
