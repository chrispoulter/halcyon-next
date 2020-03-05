const { UserInputError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const {
    searchUsers,
    getUserById,
    getUserByEmailAddress,
    createUser,
    updateUser,
    removeUser
} = require('../../data/userRepository');
const { isUserAdministrator } = require('../context');
const { hashPassword } = require('../../utils/password');

module.exports = {
    Query: {
        searchUsers: combineResolvers(
            isUserAdministrator,
            async (_, { page, size, search, sort }) => {
                const result = await searchUsers(
                    page || 1,
                    size || 10,
                    search,
                    sort
                );

                return {
                    ...result,
                    search,
                    sort
                };
            }
        ),
        getUserById: combineResolvers(isUserAdministrator, async (_, { id }) =>
            getUserById(id)
        )
    },
    Mutation: {
        createUser: combineResolvers(
            isUserAdministrator,
            async (_, { input }) => {
                const existing = await getUserByEmailAddress(
                    input.emailAddress
                );
                if (existing) {
                    throw new UserInputError(
                        `User name "${input.emailAddress}" is already taken.`
                    );
                }

                const user = {
                    emailAddress: input.emailAddress,
                    password: await hashPassword(input.password),
                    firstName: input.firstName,
                    lastName: input.lastName,
                    dateOfBirth: input.dateOfBirth,
                    roles: input.roles
                };

                const result = await createUser(user);
                return result;
            }
        ),
        updateUser: combineResolvers(
            isUserAdministrator,
            async (_, { id, input }) => {
                const user = await getUserById(id);
                if (!user) {
                    throw new UserInputError('User not found.');
                }

                if (user.emailAddress !== input.emailAddress) {
                    const existing = await getUserByEmailAddress(
                        input.emailAddress
                    );

                    if (existing) {
                        throw new UserInputError(
                            `User name "${input.emailAddress}" is already taken.`
                        );
                    }
                }

                user.emailAddress = input.emailAddress;
                user.firstName = input.firstName;
                user.lastName = input.lastName;
                user.dateOfBirth = input.dateOfBirth;
                user.roles = input.roles;
                await updateUser(user);

                return user;
            }
        ),
        lockUser: combineResolvers(
            isUserAdministrator,
            async (_, { id }, { payload }) => {
                const user = await getUserById(id);
                if (!user) {
                    throw new UserInputError('User not found.');
                }

                if (user.id === payload.sub) {
                    throw new UserInputError(
                        'Cannot lock currently logged in user.'
                    );
                }

                user.isLockedOut = true;
                await updateUser(user);

                return user;
            }
        ),
        unlockUser: combineResolvers(isUserAdministrator, async (_, { id }) => {
            const user = await getUserById(id);
            if (!user) {
                throw new UserInputError('User not found.');
            }

            user.isLockedOut = false;
            await updateUser(user);

            return user;
        }),
        deleteUser: combineResolvers(
            isUserAdministrator,
            async (_, { id }, { payload }) => {
                const user = await getUserById(id);
                if (!user) {
                    throw new UserInputError('User not found.');
                }

                if (user.id === payload.sub) {
                    throw new UserInputError(
                        'Cannot delete currently logged in user.'
                    );
                }

                await removeUser(user);

                return true;
            }
        )
    }
};
