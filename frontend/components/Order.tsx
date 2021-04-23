import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

export interface OrderT {
  id: string;
  label: string;
  total: number;
  items: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    photo: {
      image: {
        publicUrlTransformed: string;
      };
    };
  }[];
}

const OrderStyles = styled.div`
  padding: 25px;
  .item {
    padding-bottom: 20px;
    display: flex;
    img {
      max-width: 300px;
      margin-right: 20px;
    }
  }
`;

export default function Order({ order }: { order: OrderT }) {
  return (
    <OrderStyles>
      <h2>{order.label}</h2>
      {order.items.map((item) => (
        <div className='item' key={item.id}>
          <img src={item.photo.image.publicUrlTransformed} />
          <div>
            <h3>
              {item.name} {item.quantity > 1 ? `(${item.quantity})` : ''}
            </h3>
            <p>{formatMoney(item.price * item.quantity)}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </OrderStyles>
  );
}
