import { PAGINATION_QUERY } from '../components/Pagination';

export default function PaginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    read(existing, { args, cache }) {
      if (!existing) {
        return false;
      }
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (
        (page !== pages && items.length !== first) ||
        (page === pages && items.length !== count - (pages - 1) * first)
      ) {
        return false;
      }
      return items;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? [...existing] : [];
      for (let i = 0; i < incoming.length; i++) {
        merged[i + skip] = incoming[i];
      }
      return merged;
    },
  };
}
