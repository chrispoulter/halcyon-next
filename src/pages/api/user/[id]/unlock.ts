import crypto from 'crypto';
import { UpdatedResponse } from '@/models/base.types';
import { getUserSchema, unlockUserSchema } from '@/models/user.types';
import prisma from '@/utils/prisma';
import { mapHandlers, Handler } from '@/utils/handler';
import { isUserAdministrator } from '@/utils/auth';

const unlockUserHandler: Handler<UpdatedResponse> = async (req, res) => {
    const query = await getUserSchema.validate(req.query);

    const user = await prisma.users.findUnique({
        where: {
            id: query.id
        }
    });

    if (!user) {
        return res.status(404).json({
            title: 'User not found.',
            status: 404
        });
    }

    const body = await unlockUserSchema.validate(req.body);

    if (body.version && body.version !== user.version) {
        return res.status(409).json({
            title: 'Data has been modified since entities were loaded.',
            status: 409
        });
    }

    await prisma.users.update({
        where: {
            id: user.id
        },
        data: {
            isLockedOut: false,
            version: crypto.randomUUID()
        }
    });

    return res.json({
        id: user.id
    });
};

export default mapHandlers(
    {
        put: unlockUserHandler
    },
    { authorize: isUserAdministrator }
);
