import { type SyntheticEvent, useState } from 'react';
import { ErrorMessage } from '../shared/ErrorMessage';
import { formatTime } from '../shared/format';
import { useLocale } from '../shared/i18n/LocaleContext';
import { ageOn, formatCpf, formatPhone } from '../shared/people';
import { type Customer } from '../shared/types';
import { useReview } from './api';

export function ApplicationCard({ customer }: { customer: Customer }) {
  const { locale, t } = useLocale();
  const review = useReview();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');

  const reject = (event: SyntheticEvent) => {
    event.preventDefault();
    review.mutate({ customerId: customer.id, decision: 'reject', reason });
  };

  return (
    <li className="panel application" aria-label={t.applications.from(customer.fullName)}>
      <div className="application-head">
        <h3>{customer.fullName}</h3>
        <span className="muted">{t.applications.applied(formatTime(customer.registeredAt, locale))}</span>
      </div>
      <dl className="application-facts">
        <dt>{t.applications.cpf}</dt>
        <dd>{formatCpf(customer.cpf)}</dd>
        <dt>{t.applications.age}</dt>
        <dd>{t.applications.years(ageOn(customer.birthDate, new Date()))}</dd>
        <dt>{t.applications.email}</dt>
        <dd>{customer.email}</dd>
        <dt>{t.applications.phone}</dt>
        <dd>{formatPhone(customer.phone)}</dd>
      </dl>
      {rejecting ? (
        <form className="reject-form" onSubmit={reject}>
          <label className="field">
            <span>{t.applications.reason}</span>
            <input
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
              }}
              required
            />
          </label>
          <button type="submit" className="button" disabled={review.isPending}>
            {t.applications.reject}
          </button>
          <button
            type="button"
            className="button quiet"
            onClick={() => {
              setRejecting(false);
            }}
          >
            {t.applications.cancel}
          </button>
        </form>
      ) : (
        <div className="application-actions">
          <button
            type="button"
            className="button primary"
            disabled={review.isPending}
            onClick={() => {
              review.mutate({ customerId: customer.id, decision: 'approve' });
            }}
          >
            {review.isPending ? t.applications.saving : t.applications.approve}
          </button>
          <button
            type="button"
            className="button"
            onClick={() => {
              setRejecting(true);
            }}
          >
            {t.applications.startReject}
          </button>
        </div>
      )}
      <ErrorMessage error={review.error} />
    </li>
  );
}
