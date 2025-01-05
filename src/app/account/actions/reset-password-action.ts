'use server';

import { z } from 'zod';
import type { ResetPasswordResponse } from '@/app/account/account-types';
import { apiClient } from '@/lib/api-client';
import { actionClient } from '@/lib/safe-action';

const actionSchema = z.object(
    {
        token: z
            .string({ message: 'Token must be a valid string' })
            .uuid('Token must be a valid UUID'),
        emailAddress: z
            .string({ message: 'Email Address must be a valid string' })
            .email('Email Address must be a valid email'),
        newPassword: z
            .string({ message: 'New Password must be a valid string' })
            .min(8, 'New Password must be at least 8 characters')
            .max(50, 'New Password must be no more than 50 characters'),
    },
    { message: 'Action Input is required' }
);

export const resetPasswordAction = actionClient
    .schema(actionSchema)
    .action(async ({ parsedInput }) => {
        return await apiClient.put<ResetPasswordResponse>(
            '/account/reset-password',
            parsedInput
        );
    });
