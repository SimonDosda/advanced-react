import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function resetPage() {
  const { query } = useRouter();
  if (!query?.token) {
    return <RequestReset />;
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
