'use server';

import { z } from 'zod';
import type { GetUserResponse } from '@/app/user/user-types';
import { apiClient } from '@/lib/api-client';
import { actionClient } from '@/lib/safe-action';
import { Role } from '@/lib/session-types';
import { verifySession } from '@/lib/session';

const actionSchema = z.object(
    {
        id: z
            .string({ message: 'Id must be a valid string' })
            .uuid('Id must be a valid UUID'),
    },
    { message: 'Action Input is required' }
);

export const getUserAction = actionClient
    .schema(actionSchema)
    .action(async ({ parsedInput }) => {
        const { accessToken } = await verifySession([
            Role.SYSTEM_ADMINISTRATOR,
            Role.USER_ADMINISTRATOR,
        ]);

        return await apiClient.get<GetUserResponse>(
            `/user/${parsedInput.id}`,
            undefined,
            {
                Authorization: `Bearer ${accessToken}`,
            }
        );
    });
