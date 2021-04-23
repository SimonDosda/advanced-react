import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Order, { OrderT } from '../components/Order';
import DisplayError from '../components/ErrorMessage';
import Head from 'next/head';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      label
      total
      items {
        id
        name
        description
        quantity
        price
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function OrderPage() {
  const { query } = useRouter();
  const { data, error, loading } = useQuery(ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading</p>;
  if (error) return <DisplayError error={error} />;
  const { order }: { order: OrderT } = data;
  return (
    <>
      <Head>
        <title>Ivie A. - {order.label}</title>
      </Head>
      <Order order={order} />
    </>
  );
}
