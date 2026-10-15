import { Link } from 'react-router';
import { ErrorMessage } from '../shared/ErrorMessage';
import { formatMoney } from '../shared/format';
import { useAllAccounts } from './api';

export function AllAccounts() {
  const accounts = useAllAccounts();

  return (
    <>
      <ErrorMessage error={accounts.error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Account</th>
            <th scope="col">Holder</th>
            <th scope="col">Status</th>
            <th scope="col" className="numeric">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.data?.map((account) => (
            <tr key={account.id}>
              <td>
                <Link to={`/accounts/${account.id}`}>
                  {account.branch}/{account.number}
                </Link>
                <span className="table-sub">
                  {account.currency}, {account.version} events
                </span>
              </td>
              <td>{account.holder}</td>
              <td>
                <span className={`status status-${account.status.toLowerCase()}`}>{account.status}</span>
              </td>
              <td className="numeric amount">{formatMoney(account.balance, account.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
