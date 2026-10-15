import { useState } from 'react';
import { AllAccounts } from './AllAccounts';
import { Applications } from './Applications';
import { Customers } from './Customers';

const tabs = [
  { key: 'applications', label: 'Applications to review' },
  { key: 'customers', label: 'Customers' },
  { key: 'accounts', label: 'Accounts' },
] as const;

type Tab = (typeof tabs)[number]['key'];

export function BackofficePage() {
  const [tab, setTab] = useState<Tab>('applications');

  return (
    <div className="page">
      <header className="page-header">
        <h1>Back office</h1>
        <p className="lede">
          Approving an application records CustomerApproved. Accounts, Transfers and Notifications each react to it on
          their own: the account opens, PIX learns the CPF, and the customer gets an e-mail.
        </p>
      </header>
      <div className="tabs" role="tablist">
        {tabs.map((option) => (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={tab === option.key}
            onClick={() => {
              setTab(option.key);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      {tab === 'applications' && <Applications />}
      {tab === 'customers' && <Customers />}
      {tab === 'accounts' && <AllAccounts />}
    </div>
  );
}
