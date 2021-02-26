import { gql, useQuery } from '@apollo/client';

export interface CartItemT {
  id: string;
  quantity: number;
  product: {
    id: string;
    price: number;
    name: string;
    description: string;
    photo: {
      image: {
        publicUrlTransformed: string;
      };
    };
  };
}

export interface UserT {
  id: string;
  email: string;
  name: string;
  cart: CartItemT[];
}

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;
export function useUser(): UserT {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
