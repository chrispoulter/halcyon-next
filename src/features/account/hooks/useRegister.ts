import { useMutation } from '@tanstack/react-query';
import { UpdatedResponse } from '@/features/common/commonTypes';
import { RegisterRequest } from '@/features/account/accountTypes';
import { fetchWithToken } from '@/utils/fetch';
import { config } from '@/utils/config';

const register = (request: RegisterRequest) =>
    fetchWithToken<UpdatedResponse>(`${config.API_URL}/account/register`, {
        method: 'POST',
        body: JSON.stringify(request)
    });

export const useRegister = () => {
    const { mutateAsync } = useMutation({
        mutationFn: register
    });

    return { register: mutateAsync };
};
