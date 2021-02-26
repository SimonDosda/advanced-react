import { func } from 'prop-types';
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext({
  cartOpen: false,
  toggleCart: null,
  closeCart: null,
  openCart: null,
});

const LocalStateProvider = LocalStateContext.Provider;

export function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  return useContext(LocalStateContext);
}
