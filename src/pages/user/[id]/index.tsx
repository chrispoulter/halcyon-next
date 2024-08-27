import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';
import { getRunningQueriesThunk } from '@/redux/api';
import { wrapper } from '@/redux/store';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
    getUser,
    useGetUserQuery,
    useUpdateUserMutation,
    useLockUserMutation,
    useUnlockUserMutation,
    useDeleteUserMutation
} from '@/features/user/userEndpoints';
import { Meta } from '@/components/Meta/Meta';
import { Container } from '@/components/Container/Container';
import { SubTitle, Title } from '@/components/Title/Title';
import { ButtonLink } from '@/components/Button/ButtonLink';
import { ConfirmUnlockUser } from '@/features/user/ConfirmUnlockUser/ConfirmUnlockUser';
import { ConfirmLockUser } from '@/features/user/ConfirmLockUser/ConfirmLockUser';
import { ConfirmDeleteUser } from '@/features/user/ConfirmDeleteUser/ConfirmDeleteUser';
import {
    UpdateUserForm,
    UpdateUserFormState,
    UpdateUserFormValues
} from '@/features/user/UpdateUserForm/UpdateUserForm';

const UpdateUserPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const skip = !router.isReady;

    const { data: user, isFetching } = useGetUserQuery(id, {
        skip
    });

    const version = user?.version;

    const [updateUser] = useUpdateUserMutation();

    const [lockUser, { isLoading: isLocking }] = useLockUserMutation();

    const [unlockUser, { isLoading: isUnlocking }] = useUnlockUserMutation();

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const onSubmit = async (values: UpdateUserFormValues) => {
        await updateUser({
            id,
            body: { ...values, version }
        }).unwrap();

        toast.success('User successfully updated.');
        return router.push('/user');
    };

    const onDelete = async () => {
        await deleteUser({
            id,
            body: { version }
        }).unwrap();

        toast.success('User successfully deleted.');
        return router.push('/user');
    };

    const onLock = async () => {
        await lockUser({
            id,
            body: { version }
        }).unwrap();

        return toast.success('User successfully locked.');
    };

    const onUnlock = async () => {
        await unlockUser({
            id,
            body: { version }
        }).unwrap();

        return toast.success('User successfully unlocked.');
    };

    const options = ({ isSubmitting }: UpdateUserFormState) => (
        <>
            <ButtonLink href="/user" variant="secondary">
                Cancel
            </ButtonLink>

            {user?.isLockedOut ? (
                <ConfirmUnlockUser
                    onConfirm={onUnlock}
                    loading={isUnlocking}
                    disabled={
                        isDeleting || isLocking || isSubmitting || isFetching
                    }
                />
            ) : (
                <ConfirmLockUser
                    onConfirm={onLock}
                    loading={isLocking}
                    disabled={
                        isDeleting || isUnlocking || isSubmitting || isFetching
                    }
                />
            )}

            <ConfirmDeleteUser
                onConfirm={onDelete}
                loading={isDeleting}
                disabled={
                    isUnlocking || isLocking || isSubmitting || isFetching
                }
            />
        </>
    );

    return (
        <>
            <Meta title="Update User" />

            <Container>
                <Title>
                    User
                    <SubTitle>Update</SubTitle>
                </Title>

                <UpdateUserForm
                    user={user}
                    isDisabled={
                        isUnlocking || isLocking || isDeleting || isFetching
                    }
                    onSubmit={onSubmit}
                    options={options}
                />
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps(store => async ({ req, res, params }) => {
        const id = params?.id as string;
        const session = await getServerSession(req, res, authOptions);

        store.dispatch(getUser.initiate(id));

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {
                session
            }
        };
    });

export default UpdateUserPage;
