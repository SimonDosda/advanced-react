import Link from 'next/link';
import NavStyles from '../atoms/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <SignOut />
          <button type='button' onClick={openCart}>
            Cart
            <CartCount
              count={user.cart.reduce(
                (total, { quantity }) => total + quantity,
                0
              )}
            ></CartCount>
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href='/sign-in'>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
