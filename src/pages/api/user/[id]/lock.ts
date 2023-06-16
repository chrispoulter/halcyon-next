import crypto from 'crypto';
import { getUserSchema, lockUserSchema } from '@/models/user.types';
import prisma from '@/utils/prisma';
import { handler, Handler, UpdatedResponse } from '@/utils/handler';
import { isUserAdministrator } from '@/utils/auth';

const lockUserHandler: Handler<UpdatedResponse> = async (
    req,
    res,
    { currentUserId }
) => {
    const query = await getUserSchema.parseAsync(req.query);

    const user = await prisma.users.findUnique({
        where: {
            id: query.id
        }
    });

    if (!user) {
        return res.status(404).json({
            code: 'USER_NOT_FOUND',
            message: 'User not found.'
        });
    }

    const body = await lockUserSchema.parseAsync(req.body);

    if (user.version !== body.version) {
        return res.status(409).json({
            code: 'CONFLICT',
            message:
                'Data has been modified or deleted since entities were loaded.'
        });
    }

    if (user.id === currentUserId) {
        return res.status(400).json({
            code: 'LOCK_CURRENT_USER',
            message: 'Cannot lock currently logged in user.'
        });
    }

    await prisma.users.update({
        where: {
            id: user.id
        },
        data: {
            isLockedOut: true,
            version: crypto.randomUUID()
        }
    });

    return res.json({
        code: 'USER_LOCKED',
        message: 'User successfully locked.',
        data: {
            id: user.id
        }
    });
};

export default handler(
    {
        put: lockUserHandler
    },
    { auth: isUserAdministrator }
);
