import { type SyntheticEvent, useState } from 'react';
import { ErrorMessage } from '../shared/ErrorMessage';
import { formatTime } from '../shared/format';
import { ageOn, formatCpf, formatPhone } from '../shared/people';
import { type Customer } from '../shared/types';
import { useReview } from './api';

export function ApplicationCard({ customer }: { customer: Customer }) {
  const review = useReview();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');

  const reject = (event: SyntheticEvent) => {
    event.preventDefault();
    review.mutate({ customerId: customer.id, decision: 'reject', reason });
  };

  return (
    <li className="panel application" aria-label={`Application from ${customer.fullName}`}>
      <div className="application-head">
        <h3>{customer.fullName}</h3>
        <span className="muted">Applied {formatTime(customer.registeredAt)}</span>
      </div>
      <dl className="application-facts">
        <dt>CPF</dt>
        <dd>{formatCpf(customer.cpf)}</dd>
        <dt>Age</dt>
        <dd>{ageOn(customer.birthDate, new Date())} years</dd>
        <dt>E-mail</dt>
        <dd>{customer.email}</dd>
        <dt>Phone</dt>
        <dd>{formatPhone(customer.phone)}</dd>
      </dl>
      {rejecting ? (
        <form className="reject-form" onSubmit={reject}>
          <label className="field">
            <span>Reason the customer will read</span>
            <input
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
              }}
              required
            />
          </label>
          <button type="submit" className="button" disabled={review.isPending}>
            Reject application
          </button>
          <button
            type="button"
            className="button quiet"
            onClick={() => {
              setRejecting(false);
            }}
          >
            Cancel
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
            {review.isPending ? 'Saving…' : 'Approve'}
          </button>
          <button
            type="button"
            className="button"
            onClick={() => {
              setRejecting(true);
            }}
          >
            Reject
          </button>
        </div>
      )}
      <ErrorMessage error={review.error} />
    </li>
  );
}
