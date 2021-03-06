import Link from 'next/link';
import Item from '../atoms/ItemStyles';
import Title from '../atoms/Title';
import PriceTag from '../atoms/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

export default function Product({ product }: { product: ProductItem }) {
  return (
    <Item>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className='buttonList'>
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit
        </Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
        <AddToCart id={product.id} />
      </div>
    </Item>
  );
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: {
    id: string;
    image: {
      publicUrlTransformed: string;
    };
  };
}
