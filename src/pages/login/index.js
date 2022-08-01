import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import { TextInput, CheckboxInput, Button, Meta } from '../../components';
import { setToken } from '../../features';
import { useCreateTokenMutation } from '../../redux';

const LoginPage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [createToken] = useCreateTokenMutation();

    const onSubmit = async variables => {
        const { data: result } = await createToken(variables);

        if (result) {
            dispatch(
                setToken({
                    accessToken: result.data.accessToken,
                    persist: variables.rememberMe
                })
            );

            router.push('/');
        }
    };

    return (
        <Container>
            <Meta title="Login" />

            <h1>Login</h1>
            <hr />

            <Formik
                initialValues={{
                    emailAddress: '',
                    password: '',
                    rememberMe: true
                }}
                validationSchema={Yup.object({
                    emailAddress: Yup.string()
                        .label('Email Address')
                        .email()
                        .required(),
                    password: Yup.string().label('Password').required()
                })}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form noValidate>
                        <TextInput
                            name="emailAddress"
                            type="email"
                            label="Email Address"
                            required
                            maxLength={254}
                            autoComplete="username"
                        />

                        <TextInput
                            name="password"
                            type="password"
                            label="Password"
                            required
                            maxLength={50}
                            autoComplete="current-password"
                        />

                        <CheckboxInput
                            name="rememberMe"
                            label="Remember my password on this computer"
                        />

                        <div className="mb-3 text-end">
                            <Button
                                type="submit"
                                variant="primary"
                                loading={isSubmitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <p>
                Not already a member? <Link href="/register">Register now</Link>
            </p>
            <p>
                Forgotten your password?{' '}
                <Link href="/forgot-password">Request reset</Link>
            </p>
        </Container>
    );
};

export default LoginPage;
