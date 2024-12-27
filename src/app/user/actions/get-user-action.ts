'use server';

import { z } from 'zod';
import { Role, GetUserResponse } from '@/app/user/user-types';
import { config } from '@/lib/config';
import { actionClient } from '@/lib/safe-action';
import { verifySession } from '@/lib/session';

const schema = z.object({
    id: z
        .string({ message: 'Id must be a valid string' })
        .uuid('Id must be a valid UUID'),
});

export const getUserAction = actionClient
    .schema(schema)
    .action(async ({ parsedInput }) => {
        const session = await verifySession([
            Role.SYSTEM_ADMINISTRATOR,
            Role.USER_ADMINISTRATOR,
        ]);

        const response = await fetch(
            `${config.API_URL}/user/${parsedInput.id}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('An error occurred while processing your request');
        }

        return (await response.json()) as GetUserResponse;
    });
