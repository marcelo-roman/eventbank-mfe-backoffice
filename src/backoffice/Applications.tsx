import { ErrorMessage } from '../shared/ErrorMessage';
import { useLocale } from '../shared/i18n/LocaleContext';
import { ApplicationCard } from './ApplicationCard';
import { useCustomers } from './api';

export function Applications() {
  const { t } = useLocale();
  const pending = useCustomers('PendingReview');

  if (pending.isPending) {
    return <p className="muted">{t.applications.loading}</p>;
  }
  if (pending.isError) {
    return <ErrorMessage error={pending.error} />;
  }
  if (pending.data.length === 0) {
    return <p className="empty">{t.applications.empty}</p>;
  }
  return (
    <ul className="applications">
      {pending.data.map((customer) => (
        <ApplicationCard key={customer.id} customer={customer} />
      ))}
    </ul>
  );
}
