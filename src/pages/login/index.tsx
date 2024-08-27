import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Meta } from '@/components/Meta/Meta';
import { Container } from '@/components/Container/Container';
import { Title } from '@/components/Title/Title';
import { TextLink } from '@/components/TextLink/TextLink';
import {
    LoginForm,
    LoginFormValues
} from '@/features/account/LoginForm/LoginForm';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (values: LoginFormValues) => {
        const result = await signIn('credentials', {
            ...values,
            redirect: false
        });

        if (result?.ok) {
            return router.push('/');
        }

        return toast.error('The credentials provided were invalid.');
    };

    return (
        <>
            <Meta title="Login" />

            <Container>
                <Title>Login</Title>
                <LoginForm onSubmit={onSubmit} className="mb-5" />

                <p className="text-sm leading-loose text-gray-600">
                    Not already a member?{' '}
                    <TextLink href="/register">Register now</TextLink>
                    <br />
                    Forgotten your password?{' '}
                    <TextLink href="/forgot-password">Request reset</TextLink>
                </p>
            </Container>
        </>
    );
};

export default LoginPage;
