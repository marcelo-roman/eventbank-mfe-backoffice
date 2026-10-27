import { useState } from 'react';
import { useLocale } from '../shared/i18n/LocaleContext';
import { AllAccounts } from './AllAccounts';
import { Applications } from './Applications';
import { Customers } from './Customers';

const tabs = ['applications', 'customers', 'accounts'] as const;

type Tab = (typeof tabs)[number];

export function BackofficePage() {
  const { t } = useLocale();
  const [tab, setTab] = useState<Tab>('applications');

  return (
    <div className="page">
      <header className="page-header">
        <h1>{t.backoffice.title}</h1>
        <p className="lede">{t.backoffice.lede}</p>
      </header>
      <div className="tabs" role="tablist">
        {tabs.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={tab === option}
            onClick={() => {
              setTab(option);
            }}
          >
            {t.backoffice.tabs[option]}
          </button>
        ))}
      </div>
      {tab === 'applications' && <Applications />}
      {tab === 'customers' && <Customers />}
      {tab === 'accounts' && <AllAccounts />}
    </div>
  );
}
