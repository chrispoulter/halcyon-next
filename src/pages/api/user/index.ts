import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { Prisma } from '@prisma/client';
import {
    createUserSchema,
    searchUsersSchema,
    UserSort
} from '@/features/user/userTypes';
import {
    onError,
    authorize,
    AuthenticatedNextApiRequest
} from '@/utils/router';
import prisma from '@/utils/prisma';
import { hashPassword } from '@/utils/hash';
import { isUserAdministrator } from '@/utils/auth';

const router = createRouter<AuthenticatedNextApiRequest, NextApiResponse>();

router.use(authorize(isUserAdministrator));

router.get(async (req, res) => {
    const query = await searchUsersSchema.validate(req.query);

    let where: Prisma.UsersWhereInput | undefined;

    if (query.search) {
        where = {
            search: {
                contains: query.search,
                mode: Prisma.QueryMode.insensitive
            }
        };
    }

    const count = await prisma.users.count({ where });

    let orderBy: Prisma.Enumerable<Prisma.UsersOrderByWithRelationInput>;

    switch (query.sort) {
        case UserSort.EMAIL_ADDRESS_ASC:
            orderBy = {
                emailAddress: Prisma.SortOrder.asc
            };
            break;
        case UserSort.EMAIL_ADDRESS_DESC:
            orderBy = {
                emailAddress: Prisma.SortOrder.desc
            };
            break;
        case UserSort.NAME_DESC:
            orderBy = [
                { firstName: Prisma.SortOrder.desc },
                { lastName: Prisma.SortOrder.desc }
            ];
            break;
        default:
            orderBy = [
                { firstName: Prisma.SortOrder.asc },
                { lastName: Prisma.SortOrder.asc }
            ];
            break;
    }

    const skip = (query.page - 1) * query.size;

    const users = await prisma.users.findMany({
        select: {
            id: true,
            emailAddress: true,
            firstName: true,
            lastName: true,
            isLockedOut: true,
            roles: true
        },
        where,
        orderBy,
        skip,
        take: query.size
    });

    const pageCount = Math.floor((count + query.size - 1) / query.size);
    const hasNextPage = query.page < pageCount;
    const hasPreviousPage = query.page > 1;

    return res.json({
        items: users,
        hasNextPage,
        hasPreviousPage
    });
});

router.post(async (req, res) => {
    const body = await createUserSchema.validate(req.body, {
        stripUnknown: true
    });

    const existing = await prisma.users.count({
        where: {
            emailAddress: body.emailAddress
        }
    });

    if (existing) {
        return res.status(400).json({
            message: 'User name is already taken.'
        });
    }

    const result = await prisma.users.create({
        data: {
            ...body,
            password: await hashPassword(body.password),
            dateOfBirth: `${body.dateOfBirth}T00:00:00.000Z`,
            search: `${body.emailAddress} ${body.firstName} ${body.lastName}`,
            version: crypto.randomUUID()
        }
    });

    return res.json({
        id: result.id
    });
});

export default router.handler({
    onError
});
