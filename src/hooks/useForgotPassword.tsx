import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordRequest } from '@/models/account.types';
import { fetcher } from '@/utils/fetch';

export const forgotPassword = (request: ForgotPasswordRequest) =>
    fetcher('/api/account/forgot-password', 'PUT', request);

export const useForgotPassword = () => {
    const { mutateAsync } = useMutation({
        mutationFn: forgotPassword
    });

    return { forgotPassword: mutateAsync };
};
