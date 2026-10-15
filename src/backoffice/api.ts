import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../shared/api';
import { type AccountSummary, type CommandResult, type Customer } from '../shared/types';

const customersKey = ['customers'] as const;

export function useCustomers(status?: string) {
  return useQuery({
    queryKey: [...customersKey, status ?? 'all'],
    queryFn: () => get<Customer[]>(status ? `/customers?status=${status}` : '/customers'),
    refetchInterval: 3000,
  });
}

export function useAllAccounts() {
  return useQuery({ queryKey: ['accounts'], queryFn: () => get<AccountSummary[]>('/accounts'), refetchInterval: 3000 });
}

export function useReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { customerId: string; decision: 'approve' | 'reject'; reason?: string }) => {
      const result = await post<CommandResult>(
        `/customers/${input.customerId}/${input.decision}`,
        input.decision === 'reject' ? { reason: input.reason } : undefined,
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customersKey }),
  });
}
