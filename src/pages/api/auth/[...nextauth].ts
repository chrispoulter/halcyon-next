import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createTokenSchema } from '@/models/token.types';
import prisma from '@/utils/prisma';
import { verifyHash } from '@/utils/hash';
import { Role } from '@/utils/auth';
import { config } from '@/utils/config';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                emailAddress: { label: 'Email Address', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const body = await createTokenSchema.validate(credentials);

                const user = await prisma.users.findUnique({
                    where: {
                        emailAddress: body.emailAddress
                    }
                });

                if (!user || !user.password) {
                    throw new Error('The credentials provided were invalid.');
                }

                const verified = await verifyHash(body.password, user.password);

                if (!verified) {
                    throw new Error('The credentials provided were invalid.');
                }

                if (user.isLockedOut) {
                    throw new Error(
                        'This account has been locked out, please try again later.'
                    );
                }

                return {
                    ...user,
                    roles: user.roles?.map(r => r as Role)
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.emailAddress;
                token.name = `${user.firstName} ${user.lastName}`;
                token.picture = null;
                token.roles = user.roles;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
                session.user.roles = token.roles;
            }

            return session;
        }
    },
    pages: {
        signIn: '/login'
    },
    session: {
        maxAge: config.NEXTAUTH_SESSION_MAXAGE
    },
    secret: config.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
