import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from '../atoms/PaginationStyles';
import { perPage } from '../config';
import DisplayError from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { count } = data?._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <>
      <Head>
        <title>
          Ivie A. | Page {page} of {count}
        </title>
      </Head>
      <PaginationStyles>
        <Link href={`/products/${page - 1}`}>
          <a aria-disabled={page <= 1}>Prev</a>
        </Link>
        <p>
          Page {page} of {pageCount}
        </p>
        <p>{count} Items Total</p>
        <Link href={`/products/${page + 1}`}>
          <a aria-disabled={page >= pageCount}>Next</a>
        </Link>
      </PaginationStyles>
    </>
  );
}
