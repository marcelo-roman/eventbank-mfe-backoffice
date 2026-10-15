import { ErrorMessage } from '../shared/ErrorMessage';
import { formatTime } from '../shared/format';
import { formatCpf } from '../shared/people';
import { useCustomers } from './api';

const statusLabels: Record<string, string> = { PendingReview: 'In review', Approved: 'Approved', Rejected: 'Rejected' };

export function Customers() {
  const customers = useCustomers();

  return (
    <>
      <ErrorMessage error={customers.error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">CPF</th>
            <th scope="col">Status</th>
            <th scope="col">Applied</th>
          </tr>
        </thead>
        <tbody>
          {customers.data?.map((customer) => (
            <tr key={customer.id}>
              <td>
                {customer.fullName}
                <span className="table-sub">{customer.email}</span>
              </td>
              <td>{formatCpf(customer.cpf)}</td>
              <td>
                <span className={`status status-${customer.status.toLowerCase()}`}>
                  {statusLabels[customer.status]}
                </span>
                {customer.rejectionReason && <span className="table-sub">{customer.rejectionReason}</span>}
              </td>
              <td className="muted">{formatTime(customer.registeredAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
