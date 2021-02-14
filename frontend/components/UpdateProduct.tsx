import useForm from '../lib/useForm';
import Form from '../atoms/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';

interface Inputs {
  image: File | null;
  name: string;
  price: number;
  description: string;
}

const GET_PRODUCT_QUERY = gql`
  query GET_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      price
      description
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(GET_PRODUCT_QUERY, {
    variables: { id },
  });
  const { inputs, handleChange } = useForm<Inputs>(data?.Product || {});
  const [
    updateProduct,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  if (loading) return <p>Loading ...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateProduct({
          variables: { id, ...inputs },
          refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
        });
        Router.push({
          pathname: `/product/${id}`,
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Update Product</button>
    </Form>
  );
}
