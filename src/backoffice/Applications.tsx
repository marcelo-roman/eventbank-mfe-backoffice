import { ErrorMessage } from '../shared/ErrorMessage';
import { ApplicationCard } from './ApplicationCard';
import { useCustomers } from './api';

export function Applications() {
  const pending = useCustomers('PendingReview');

  if (pending.isPending) {
    return <p className="muted">Loading applications…</p>;
  }
  if (pending.isError) {
    return <ErrorMessage error={pending.error} />;
  }
  if (pending.data.length === 0) {
    return <p className="empty">No applications waiting for review.</p>;
  }
  return (
    <ul className="applications">
      {pending.data.map((customer) => (
        <ApplicationCard key={customer.id} customer={customer} />
      ))}
    </ul>
  );
}
