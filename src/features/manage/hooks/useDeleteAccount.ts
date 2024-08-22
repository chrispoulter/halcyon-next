import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedResponse } from '@/features/common/commonTypes';
import { DeleteAccountRequst } from '../manageTypes';
import { fetcher } from '@/utils/fetch';
import { config } from '@/utils/config';

const deleteAccount = (request: DeleteAccountRequst) =>
    fetcher<UpdatedResponse>(`${config.API_URL}/manage`, {
        method: 'DELETE',
        body: JSON.stringify(request)
    });

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (request: DeleteAccountRequst) => deleteAccount(request),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['profile'],
                refetchType: 'none'
            })
    });

    return { deleteAccount: mutateAsync, isDeleting: isPending };
};
