import styled from 'styled-components';
import CartStyles from '../atoms/CartStyles';
import Supreme from '../atoms/Supreme';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import Product from './Product';
import { CartItemT, useUser } from './User';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }: { cartItem: CartItemT }) {
  const { product, quantity } = cartItem;
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
        `
      </p>
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  if (!user) {
    return <p>please log in</p>;
  }
  return (
    <CartStyles open={true}>
      <header>
        <Supreme>{user.name}'s cart</Supreme>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
}
