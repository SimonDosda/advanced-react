import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Order, { OrderT } from '../components/Order';
import DisplayError from '../components/ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    orders: allOrders {
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

const OrderList = styled.div``;

export default function OrdersPage() {
  const { data, error, loading } = useQuery(ORDERS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <DisplayError error={error} />;
  const { orders }: { orders: OrderT[] } = data;
  return (
    <>
      <Head>
        <title>Ivie A - Orders</title>
      </Head>
      <OrderList>
        {data.orders.map((order) => (
          <div key={order.id}>
            <Order order={order} />
            <a href={`order?id=${order.id}`}>See details</a>
          </div>
        ))}
      </OrderList>
    </>
  );
}
