import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [confirm, setConfirm] = useState(false);
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  if (loading) {
    return <span>Deleting</span>;
  }
  if (!confirm) {
    return (
      <button type="button" onClick={() => setConfirm(true)}>
        {children}
      </button>
    );
  }
  return (
    <>
      <button
        type="button"
        onClick={() => {
          deleteProduct().catch((err) => alert(err.message));
        }}
      >
        Confirm {children}
      </button>
      <button type="button" onClick={() => setConfirm(false)}>
        Cancel
      </button>
    </>
  );
}
