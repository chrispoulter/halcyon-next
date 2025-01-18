import {
    createSafeActionClient,
    DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { forbidden, notFound, redirect } from 'next/navigation';
import { ApiClientError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { Role } from '@/lib/session-types';

export const actionClient = createSafeActionClient({
    defaultValidationErrorsShape: 'flattened',
    handleServerError: (error) => {
        if (error instanceof ApiClientError) {
            switch (error.status) {
                case 401:
                    redirect('/account/login');

                case 403:
                    forbidden();

                case 404:
                    notFound();
            }

            return error.message;
        }

        return DEFAULT_SERVER_ERROR_MESSAGE;
    },
});

export const authActionClient = (roles?: Role[]) =>
    actionClient.use(async ({ next }) => {
        const session = await getSession();

        if (!session) {
            redirect('/account/login');
        }

        if (roles && !roles.some((value) => session.roles?.includes(value))) {
            forbidden();
        }

        const { accessToken } = session;

        return next({ ctx: { accessToken } });
    });
