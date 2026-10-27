import { type Locale } from './locale';

const en = {
  errors: {
    generic: 'Something failed. Try again.',
    sessionEnded: 'Your session ended. Sign in again.',
    forbidden: 'You are not allowed to do this.',
    status: (status: number) => `The server answered ${status}.`,
    codes: {
      already_reviewed: 'The application was already reviewed.',
      reason_required: 'Tell the customer why the application was rejected.',
      not_found: 'This was not found.',
      forbidden: 'You are not allowed to do this.',
      concurrency_conflict: 'Someone changed this at the same time. Try again.',
    } as Record<string, string>,
  },
  backoffice: {
    title: 'Back office',
    lede: 'Approving an application records CustomerApproved. Accounts, Transfers and Notifications each react to it on their own: the account opens, PIX learns the CPF, and the customer gets an e-mail.',
    tabs: {
      applications: 'Applications to review',
      customers: 'Customers',
      accounts: 'Accounts',
    },
  },
  applications: {
    loading: 'Loading applications…',
    empty: 'No applications waiting for review.',
    from: (name: string) => `Application from ${name}`,
    applied: (time: string) => `Applied ${time}`,
    cpf: 'CPF',
    age: 'Age',
    years: (age: number) => `${age} years`,
    email: 'E-mail',
    phone: 'Phone',
    reason: 'Reason the customer will read',
    reject: 'Reject application',
    cancel: 'Cancel',
    saving: 'Saving…',
    approve: 'Approve',
    startReject: 'Reject',
  },
  customers: {
    customer: 'Customer',
    cpf: 'CPF',
    status: 'Status',
    applied: 'Applied',
    statuses: {
      PendingReview: 'In review',
      Approved: 'Approved',
      Rejected: 'Rejected',
    } as Record<string, string>,
  },
  accounts: {
    account: 'Account',
    holder: 'Holder',
    status: 'Status',
    balance: 'Balance',
    events: (count: number) => `${count} events`,
    statuses: {
      Open: 'Open',
      Closed: 'Closed',
    } as Record<string, string>,
  },
};

export type Messages = typeof en;

const ptBR: Messages = {
  errors: {
    generic: 'Algo deu errado. Tente de novo.',
    sessionEnded: 'Sua sessão terminou. Entre novamente.',
    forbidden: 'Você não tem permissão para fazer isso.',
    status: (status: number) => `O servidor respondeu ${status}.`,
    codes: {
      already_reviewed: 'A proposta já foi analisada.',
      reason_required: 'Diga ao cliente por que a proposta foi recusada.',
      not_found: 'Não encontrado.',
      forbidden: 'Você não tem permissão para fazer isso.',
      concurrency_conflict: 'Alguém alterou isto ao mesmo tempo. Tente de novo.',
    },
  },
  backoffice: {
    title: 'Back office',
    lede: 'Aprovar uma proposta registra CustomerApproved. Contas, Transferências e Notificações reagem a isso cada um por conta própria: a conta é aberta, o PIX passa a conhecer o CPF e o cliente recebe um e-mail.',
    tabs: {
      applications: 'Propostas para analisar',
      customers: 'Clientes',
      accounts: 'Contas',
    },
  },
  applications: {
    loading: 'Carregando propostas…',
    empty: 'Nenhuma proposta aguardando análise.',
    from: (name: string) => `Proposta de ${name}`,
    applied: (time: string) => `Enviada em ${time}`,
    cpf: 'CPF',
    age: 'Idade',
    years: (age: number) => `${age} anos`,
    email: 'E-mail',
    phone: 'Telefone',
    reason: 'Motivo que o cliente vai ler',
    reject: 'Recusar proposta',
    cancel: 'Cancelar',
    saving: 'Salvando…',
    approve: 'Aprovar',
    startReject: 'Recusar',
  },
  customers: {
    customer: 'Cliente',
    cpf: 'CPF',
    status: 'Situação',
    applied: 'Enviada em',
    statuses: {
      PendingReview: 'Em análise',
      Approved: 'Aprovada',
      Rejected: 'Recusada',
    },
  },
  accounts: {
    account: 'Conta',
    holder: 'Titular',
    status: 'Situação',
    balance: 'Saldo',
    events: (count: number) => `${count} eventos`,
    statuses: {
      Open: 'Aberta',
      Closed: 'Encerrada',
    },
  },
};

export const messages: Record<Locale, Messages> = { en, 'pt-BR': ptBR };
