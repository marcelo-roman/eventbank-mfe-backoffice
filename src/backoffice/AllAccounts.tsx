import { Link } from 'react-router';
import { ErrorMessage } from '../shared/ErrorMessage';
import { formatMoney } from '../shared/format';
import { useLocale } from '../shared/i18n/LocaleContext';
import { useAllAccounts } from './api';

export function AllAccounts() {
  const { locale, t } = useLocale();
  const accounts = useAllAccounts();

  return (
    <>
      <ErrorMessage error={accounts.error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t.accounts.account}</th>
            <th scope="col">{t.accounts.holder}</th>
            <th scope="col">{t.accounts.status}</th>
            <th scope="col" className="numeric">
              {t.accounts.balance}
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
                  {account.currency}, {t.accounts.events(account.version)}
                </span>
              </td>
              <td>{account.holder}</td>
              <td>
                <span className={`status status-${account.status.toLowerCase()}`}>
                  {t.accounts.statuses[account.status]}
                </span>
              </td>
              <td className="numeric amount">{formatMoney(account.balance, account.currency, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
