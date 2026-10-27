import { ErrorMessage } from '../shared/ErrorMessage';
import { formatTime } from '../shared/format';
import { useLocale } from '../shared/i18n/LocaleContext';
import { formatCpf } from '../shared/people';
import { useCustomers } from './api';

export function Customers() {
  const { locale, t } = useLocale();
  const customers = useCustomers();

  return (
    <>
      <ErrorMessage error={customers.error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t.customers.customer}</th>
            <th scope="col">{t.customers.cpf}</th>
            <th scope="col">{t.customers.status}</th>
            <th scope="col">{t.customers.applied}</th>
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
                  {t.customers.statuses[customer.status]}
                </span>
                {customer.rejectionReason && <span className="table-sub">{customer.rejectionReason}</span>}
              </td>
              <td className="muted">{formatTime(customer.registeredAt, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
