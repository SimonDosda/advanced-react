import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from '../../components/ErrorMessage';
import { ProductItem } from '../../components/Product';

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function ProductPage() {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: query,
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <DisplayError error={error} />;
  const product: ProductItem = data.Product;
  return (
    <ProductStyles>
      <Head>
        <title>Ivie A. | {product.name}</title>
      </Head>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div className='details'>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}
