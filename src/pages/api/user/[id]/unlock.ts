import { getUserSchema } from '@/models/user.types';
import prisma from '@/utils/prisma';
import { handler, Handler, UpdatedResponse } from '@/utils/handler';
import { isUserAdministrator } from '@/utils/auth';

const unlockUserHandler: Handler<UpdatedResponse> = async (req, res) => {
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

    await prisma.users.update({
        where: {
            id: user.id
        },
        data: {
            isLockedOut: false
        }
    });

    return res.json({
        code: 'USER_UNLOCKED',
        message: 'User successfully unlocked.',
        data: {
            id: user.id
        }
    });
};

export default handler(
    {
        put: unlockUserHandler
    },
    { auth: isUserAdministrator }
);
